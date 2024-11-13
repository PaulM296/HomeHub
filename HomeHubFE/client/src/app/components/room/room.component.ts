import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageResponse } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';
import { MatButton } from '@angular/material/button';

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

  rooms: StorageResponse[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    const houseId = this.route.snapshot.paramMap.get('houseId');
    if (houseId) {
      this.storageService.getRoomsByHouseId(houseId).subscribe({
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
    console.log('Editing room:', room);
  }

  deleteRoom(roomId: string): void {
    console.log('Deleting room with ID:', roomId);
  }

  addRoom(): void {
    console.log('Add Room button clicked');
  }

  viewStorages(roomId: string): void {
    this.router.navigate([`/rooms/${roomId}/storages`]);
  }
}
