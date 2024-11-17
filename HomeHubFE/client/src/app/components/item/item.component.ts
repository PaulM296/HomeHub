import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ItemService } from '../../services/item.service';
import { StorageDataService } from '../../services/storage-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ItemResponse } from '../../models/itemResponse';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { ItemCardComponent } from "../item-card/item-card.component";
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { EditItemDialogComponent, EditItemDialogData } from '../edit-item-dialog/edit-item-dialog.component';
import { UpdateItem } from '../../models/updateItem';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    ItemCardComponent
],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  private itemService = inject(ItemService);
  private storageDataService = inject(StorageDataService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  items: ItemResponse[] = [];
  isLoading = true;
  storageId: string | null = null;
  storageName: string = 'Unknown Storage';

  ngOnInit(): void {
    this.storageId = this.route.snapshot.paramMap.get('storageId');
    this.storageName = this.storageDataService.getStorageName() || 'Unknown Storage';
    
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.storageDataService.clearStorageName();
  }

  loadItems(): void {
    if (this.storageName) {
      this.itemService.getItems(this.storageName).subscribe({
        next: (data) => {
          this.items = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Error fetching items:', err);
          this.isLoading = false;
        }
      });
    }
  }

  editItem(item: ItemResponse): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '600px',
      data: {
        item: item
      } as EditItemDialogData
    });

    dialogRef.afterClosed().subscribe((result: UpdateItem | undefined) => {
      if (result) {
        this.itemService.updateItem(item.name, result).subscribe({
          next: (updatedItem) => {
            const index = this.items.findIndex(i => i.id === updatedItem.id);
            if (index !== -1) {
              this.items[index] = updatedItem;
            }
          },
          error: (err) => console.error('Error updating item:', err)
        });
      }
    });
  }

  deleteItem(item: ItemResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { itemType: 'item' } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.itemService.deleteItem(item.name).subscribe({
          next: () => {
            this.items = this.items.filter(i => i.id !== item.id);
            console.log(`Item deleted successfully.`);
          },
          error: (err) => console.error('Error deleting item:', err)
        });
      }
    });
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.storageName) {
        const newItem = {
          ...result,
          storageName: this.storageName
        };

        this.itemService.createItem(newItem).subscribe({
          next: (createdItem) => {
            this.items.push(createdItem);
            console.log('Item added successfully');
          },
          error: (err) => {
            console.error('Error adding item:', err);
          }
        });
      }
    });
  }
}
