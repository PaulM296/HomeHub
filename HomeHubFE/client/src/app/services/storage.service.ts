import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageResponse } from '../models/storageResponse';
import { CreateStorage } from '../models/createStorage';
import { UpdateStorage } from '../models/updateStorage';

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

  createStorage(createStorage: CreateStorage): Observable<StorageResponse> {
    return this.http.post<StorageResponse>(`${this.apiUrl}`, createStorage);
  }

  updateStorage(storageName: string, updateStorage: UpdateStorage): Observable<StorageResponse> {
    return this.http.put<StorageResponse>(`${this.apiUrl}/${storageName}`, updateStorage);
  }

  deleteStorage(storageName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${storageName}`);
  }
}
