import { Component, inject, OnInit } from '@angular/core';
import { StorageResponse } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-room-storages',
  standalone: true,
  imports: [
    CommonModule,
    StorageCardComponent
  ],
  templateUrl: './room-storages.component.html',
  styleUrl: './room-storages.component.scss'
})
export class RoomStoragesComponent implements OnInit {
  private storageService = inject(StorageService);
  private route = inject(ActivatedRoute);
  storages: StorageResponse[] = [];
  isLoading = true;

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    if (roomId) {
      this.fetchStorages(roomId);
    }
  }

  fetchStorages(roomId: string): void {
    this.storageService.getStoragesByRoomId(roomId).subscribe({
      next: (data) => {
        this.storages = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error fetching storages:', error);
        this.isLoading = false;
      }
    });
  }

  editRoomStorage(storage: StorageResponse): void {
    console.log('Editing room:', storage);
  }

  deleteRoomStorage(storageId: string): void {
    console.log('Deleting room with ID:', storageId);
  }
}
