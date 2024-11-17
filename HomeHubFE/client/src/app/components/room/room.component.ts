import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageResponse, StorageType } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';
import { MatButton } from '@angular/material/button';
import { AddStorageDialogComponent, AddStorageDialogData } from '../add-storage-dialog/add-storage-dialog.component';
import { CreateStorage } from '../../models/createStorage';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStorage } from '../../models/updateStorage';
import { EditStorageDialogComponent, EditStorageDialogData } from '../edit-storage-dialog/edit-storage-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { StorageDataService } from '../../services/storage-data.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    StorageCardComponent,
    MatButton
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  private storageService = inject(StorageService);
  private storageDataService = inject(StorageDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  rooms: StorageResponse[] = [];
  isLoading = true;
  houseId: string | null = null;
  houseName: string = 'Unknown House';

  ngOnInit(): void {
    this.houseId = this.route.snapshot.paramMap.get('houseId');
    this.houseName = this.storageDataService.getHouseName() || 'Unknown House';

    this.loadRooms();
  }

  ngOnDestroy(): void {
    this.storageDataService.clearHouseName();
  }

  loadRooms(): void {
    if (this.houseId) {
      this.storageService.getRoomsByHouseId(this.houseId).subscribe({
        next: (rooms) => {
          this.rooms = rooms;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load rooms', err);
          this.isLoading = false;
        }
      });
    }
  }

  editRoom(room: StorageResponse): void {
    const dialogRef = this.dialog.open(EditStorageDialogComponent, {
      width: '600px',
      data: {
        storageType: StorageType.Room,
        storage: room
      } as EditStorageDialogData
    });

    dialogRef.afterClosed().subscribe((result: UpdateStorage | undefined) => {
      if (result) {
        this.storageService.updateStorage(room.name, result).subscribe({
          next: (updatedRoom) => {
            const index = this.rooms.findIndex(r => r.id === updatedRoom.id);
            if (index !== -1) {
              this.rooms[index] = updatedRoom;
            }
          },
          error: (err) => console.error('Error updating room:', err)
        });
      }
    });
  }

  deleteRoom(room: StorageResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { itemType: 'room' } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.storageService.deleteStorage(room.name).subscribe({
          next: () => {
            this.rooms = this.rooms.filter(r => r.id !== room.id);
            console.log(`Room ${room.name} deleted successfully.`);
          },
          error: (err) => console.error('Error deleting room:', err)
        });
      }
    });
  }

  addRoom(): void {
    const dialogRef = this.dialog.open(AddStorageDialogComponent, {
      width: '600px',
      data: { storageType: StorageType.Room } as AddStorageDialogData
    });
  
    dialogRef.afterClosed().subscribe((result: CreateStorage | undefined) => {
      if (result && this.houseId) {
        const newRoomData: CreateStorage = {
          ...result,
          parentStorageName: this.houseName
        };
  
        this.storageService.createStorage(newRoomData).subscribe({
          next: (newRoom) => {
            this.rooms.push(newRoom);
          },
          error: (err) => console.error('Error adding room:', err)
        });
      }
    });
  }

  viewStorages(room: StorageResponse): void {
    this.storageDataService.setRoomName(room.name);
    this.router.navigate([`/rooms/${room.id}/storages`]);
  }
}
