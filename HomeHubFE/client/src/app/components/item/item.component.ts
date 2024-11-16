import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ItemService } from '../../services/item.service';
import { StorageDataService } from '../../services/storage-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ItemResponse } from '../../models/itemResponse';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  private itemService = inject(ItemService);
  private storageDataService = inject(StorageDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
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
            console.log('Item added successfully:', createdItem);
          },
          error: (err) => {
            console.error('Error adding item:', err);
          }
        });
      }
    });
  }
}
