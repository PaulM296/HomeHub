import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateItem } from '../models/createItem';
import { ItemResponse } from '../models/itemResponse';
import { UpdateItem } from '../models/updateItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${ environment.apiUrl }`;
  private http = inject(HttpClient);

  getItems(storageName: string): Observable<ItemResponse[]> {
    return this.http.get<ItemResponse[]>(`${this.apiUrl}/storages/${storageName}/items`);
  }

  createItem(createItem: CreateItem): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.apiUrl}/items`, createItem);
  }

  updateItem(itemName: string, updateItem: UpdateItem): Observable<ItemResponse> {
    return this.http.put<ItemResponse>(`${this.apiUrl}/items/${itemName}`, updateItem);
  }

  deleteItem(itemName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${itemName}`);
  }
}
