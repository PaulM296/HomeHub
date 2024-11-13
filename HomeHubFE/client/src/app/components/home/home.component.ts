import { Component, inject, OnInit } from '@angular/core';
import { StorageResponse, StorageType } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AddStorageDialogComponent, AddStorageDialogData } from '../add-storage-dialog/add-storage-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateStorage } from '../../models/createStorage';
import { UpdateStorage } from '../../models/updateStorage';
import { EditStorageDialogComponent, EditStorageDialogData } from '../edit-storage-dialog/edit-storage-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    StorageCardComponent,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private storageService = inject(StorageService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  houses: StorageResponse[] = [];
  isLoading = true;
  hasHouses = false;

  ngOnInit(): void {
    this.fetchHouses();
  }

  fetchHouses(): void {
    this.storageService.getHouses().subscribe({
      next: (data) => {
        this.houses = data;
        this.hasHouses = this.houses.length > 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error fetching houses:', error);
        this.isLoading = false;
      }
    });
  }

  editHouse(house: StorageResponse): void {
    const dialogRef = this.dialog.open(EditStorageDialogComponent, {
      width: '600px',
      data: { storageType: StorageType.House, storage: house } as EditStorageDialogData
    });

    dialogRef.afterClosed().subscribe((result: UpdateStorage | undefined) => {
      if (result) {
        this.storageService.updateStorage(house.name, result).subscribe({
          next: (updatedHouse) => {
            const index = this.houses.findIndex(h => h.id === updatedHouse.id);
            if (index !== -1) {
              this.houses[index] = updatedHouse;
            }
          },
          error: (err) => console.error('Error updating house:', err)
        });
      }
    });
  }

  deleteHouse(houseId: string): void {
    console.log('Deleting house with ID:', houseId);
  }

  viewRooms(houseId: string): void {
    this.router.navigate([`/houses/${houseId}/rooms`]);
  }

  addHouse(): void {
    const dialogRef = this.dialog.open(AddStorageDialogComponent, {
      width: '600px',
      data: { storageType: StorageType.House } as AddStorageDialogData
    });

    dialogRef.afterClosed().subscribe((result: CreateStorage | undefined) => {
      if (result) {
        this.storageService.createStorage(result).subscribe({
          next: (newHouse) => {
            this.houses.push(newHouse);
          },
          error: (err) => console.error('Error adding house:', err)
        });
      }
    });
  }
}
