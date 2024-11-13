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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  rooms: StorageResponse[] = [];
  isLoading = true;
  houseId: string | null = null;

  ngOnInit(): void {
    this.houseId = this.route.snapshot.paramMap.get('houseId');
    this.loadRooms();
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

  deleteRoom(roomId: string): void {
    console.log('Deleting room with ID:', roomId);
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
          parentStorageName: 'House Name Here'
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

  viewStorages(roomId: string): void {
    this.router.navigate([`/rooms/${roomId}/storages`]);
  }
}
