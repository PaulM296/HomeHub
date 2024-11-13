import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageResponse } from '../models/storageResponse';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = `${ environment.apiUrl }/storages`;
  private http = inject(HttpClient);

  getHouses(): Observable<StorageResponse[]> {
    return this.http.get<StorageResponse[]>(`${this.apiUrl}/houses`);
  }

  getRoomsByHouseId(houseId: string): Observable<StorageResponse[]> {
    return this.http.get<StorageResponse[]>(`${this.apiUrl}/${houseId}/rooms`);
  }
  
  getStoragesByRoomId(roomId: string): Observable<StorageResponse[]> {
    return this.http.get<StorageResponse[]>(`${this.apiUrl}/${roomId}/substorages`);
  }
}
