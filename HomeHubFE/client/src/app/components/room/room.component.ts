import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageResponse } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    StorageCardComponent
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  private storageService = inject(StorageService);
  private route = inject(ActivatedRoute);

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
}
