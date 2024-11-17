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
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { StorageDataService } from '../../services/storage-data.service';
import { AddUserDialogComponent, AddUserDialogData } from '../add-user-dialog/add-user-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';

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
  private storageDataService = inject(StorageDataService);
  private snackBar = inject(SnackbarService);
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
      data: {
        storageType: StorageType.House,
        storage: house
      } as EditStorageDialogData
    });

    dialogRef.afterClosed().subscribe((result: UpdateStorage | undefined) => {
      if (result) {
        this.storageService.updateStorage(house.name, result).subscribe({
          next: (updatedHouse) => {
            this.snackBar.success('House updated successfully!');
            const index = this.houses.findIndex(h => h.id === updatedHouse.id);
            if (index !== -1) {
              this.houses[index] = updatedHouse;
            }
          },
          error: (err) => {
            this.snackBar.error('Error updating house!');
            console.error('Error updating house:', err);
          }
        });
      }
    });
  }

  deleteHouse(house: StorageResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { itemType: 'house' } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.storageService.deleteStorage(house.name).subscribe({
          next: () => {
            this.snackBar.success('House deleted successfully!');
            this.houses = this.houses.filter(h => h.id !== house.id);
          },
          error: (err) => {
            this.snackBar.error('Error deleting house!');
            console.error('Error deleting house:', err);
          }
        });
      }
    });
  }

  viewRooms(house: StorageResponse): void {
    this.storageDataService.setHouseName(house.name);
    this.router.navigate([`/houses/${house.id}/rooms`]);
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
            this.snackBar.success('House created successfully!');
            this.houses.push(newHouse);
          },
          error: (err) => {
            this.snackBar.error('Error adding house!');
            console.error('Error adding house:', err);
          }
        });
      }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
      data: { houses: this.houses } as AddUserDialogData
    });
  
    dialogRef.afterClosed().subscribe((result: { houseId: string; email: string } | undefined) => {
      if (result) {
        const { houseId, email } = result;

        this.storageService.addUserToHouse(houseId, email).subscribe({
          next: () => {
            this.snackBar.success('User added successfully to house!');
          },
          error: (err) => {
            this.snackBar.error('Error adding user to house!');
            console.error('Error adding user to house:', err);
          }
        });
      }
    });
  }
}
