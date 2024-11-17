import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {
  private houseName: string | null = null;
  private houseNameKey = 'houseName';
  private roomName: string | null = null;
  private roomNameKey = 'roomName';
  private storageName: string | null = null;
  private storageNameKey = 'storageName';

  setHouseName(name: string): void {
    this.houseName = name;
    sessionStorage.setItem(this.houseNameKey, name);
  }

  getHouseName(): string | null {
    if (this.houseName) {
      return this.houseName;
    }
    const storedName = sessionStorage.getItem(this.houseNameKey);
    return storedName ? storedName : null;
  }

  clearHouseName(): void {
    this.houseName = null;
    sessionStorage.removeItem(this.houseNameKey);
  }

  setRoomName(name: string): void {
    this.roomName = name;
    sessionStorage.setItem(this.roomNameKey, name);
  }

  getRoomName(): string | null {
    if (this.roomName) {
      return this.roomName;
    }
    const storedName = sessionStorage.getItem(this.roomNameKey);
    return storedName ? storedName : null;
  }

  clearRoomName(): void {
    this.roomName = null;
    sessionStorage.removeItem(this.roomNameKey);
  }

  setStorageName(name: string): void {
    this.storageName = name;
    sessionStorage.setItem(this.storageNameKey, name);
  }

  getStorageName(): string | null {
    if (this.storageName) {
      return this.storageName;
    }
    const storedName = sessionStorage.getItem(this.storageNameKey);
    return storedName ? storedName : null;
  }

  clearStorageName(): void {
    this.storageName = null;
    sessionStorage.removeItem(this.storageNameKey);
  }
}
