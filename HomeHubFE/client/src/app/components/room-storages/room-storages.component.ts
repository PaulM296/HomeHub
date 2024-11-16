import { Component, inject, OnInit } from '@angular/core';
import { StorageResponse, StorageType } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { StorageDataService } from '../../services/storage-data.service';
import { EditStorageDialogComponent, EditStorageDialogData } from '../edit-storage-dialog/edit-storage-dialog.component';
import { UpdateStorage } from '../../models/updateStorage';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { AddStorageDialogComponent, AddStorageDialogData } from '../add-storage-dialog/add-storage-dialog.component';
import { CreateStorage } from '../../models/createStorage';

@Component({
  selector: 'app-room-storages',
  standalone: true,
  imports: [
    CommonModule,
    StorageCardComponent,
    MatButton
  ],
  templateUrl: './room-storages.component.html',
  styleUrl: './room-storages.component.scss'
})
export class RoomStoragesComponent implements OnInit {
  private storageService = inject(StorageService);
  private storageDataService = inject(StorageDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  storages: StorageResponse[] = [];
  isLoading = true;
  roomId: string | null = null;
  roomName: string = 'Unknown Room';

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.roomName = this.storageDataService.getRoomName() || 'Unknown Room';
    console.log(this.roomName);
    
    this.loadStorages();
  }

  ngOnDestroy(): void {
    this.storageDataService.clearRoomName();
  }

  loadStorages(): void {
    if (this.roomId) {
      this.storageService.getStoragesByRoomId(this.roomId).subscribe({
        next: (data) => {
          this.storages = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Error fetching storages:', err);
          this.isLoading = false;
        }
      });
    }
  }

  editRoomStorage(storage: StorageResponse): void {
    const dialogRef = this.dialog.open(EditStorageDialogComponent, {
      width: '600px',
      data: {
        storageType: storage.type,
        storage: storage
      } as EditStorageDialogData
    });

    dialogRef.afterClosed().subscribe((result: UpdateStorage | undefined) => {
      if (result) {
        this.storageService.updateStorage(storage.name, result).subscribe({
          next: (updatedStorage) => {
            const index = this.storages.findIndex(s => s.id === updatedStorage.id);
            if (index !== -1) {
              this.storages[index] = updatedStorage;
            }
          },
          error: (err) => console.error('Error updating storage:', err)
        });
      }
    });
  }

  deleteRoomStorage(storage: StorageResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { itemType: 'room' } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.storageService.deleteStorage(storage.name).subscribe({
          next: () => {
            this.storages = this.storages.filter(r => r.id !== storage.id);
            console.log(`Storage ${storage.name} deleted successfully.`);
          },
          error: (err) => console.error('Error deleting storage:', err)
        });
      }
    });
  }

  addFridge(): void {
    const dialogRef = this.dialog.open(AddStorageDialogComponent, {
      width: '600px',
      data: { storageType: StorageType.Fridge } as AddStorageDialogData
    });
  
    dialogRef.afterClosed().subscribe((result: CreateStorage | undefined) => {
      if (result && this.roomId) {
        const newFridgeData: CreateStorage = {
          ...result,
          parentStorageName: this.roomName
        };
  
        this.storageService.createStorage(newFridgeData).subscribe({
          next: (newRoom) => {
            this.storages.push(newRoom);
          },
          error: (err) => console.error('Error adding fridge:', err)
        });
      }
    });
  }

  addDeposit(): void {
    const dialogRef = this.dialog.open(AddStorageDialogComponent, {
      width: '600px',
      data: { storageType: StorageType.Deposit } as AddStorageDialogData
    });
  
    dialogRef.afterClosed().subscribe((result: CreateStorage | undefined) => {
      if (result && this.roomId) {
        const newDepositData: CreateStorage = {
          ...result,
          parentStorageName: this.roomName
        };
  
        this.storageService.createStorage(newDepositData).subscribe({
          next: (newRoom) => {
            this.storages.push(newRoom);
          },
          error: (err) => console.error('Error adding deposit:', err)
        });
      }
    });
  }

  viewItems(storage: StorageResponse): void {
    this.router.navigate([`/rooms/${storage.id}/storages`]);
  }
}
