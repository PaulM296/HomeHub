import { Component, inject, OnInit } from '@angular/core';
import { StorageResponse } from '../../models/storageResponse';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { StorageCardComponent } from '../storage-card/storage-card.component';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

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
    console.log('Editing house:', house);
  }

  deleteHouse(houseId: string): void {
    console.log('Deleting house with ID:', houseId);
  }

  viewRooms(houseId: string): void {
    this.router.navigate([`/houses/${houseId}/rooms`]);
  }

  addHouse(): void {
    console.log('Add House button clicked');
    
  }
}
