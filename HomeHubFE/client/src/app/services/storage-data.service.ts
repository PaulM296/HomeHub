import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {
  private houseName: string | null = null;
  private houseNameKey = 'houseName';
  private roomName: string | null = null;
  private roomNameKey = 'roomName';

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
}
