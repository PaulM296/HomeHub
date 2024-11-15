import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {
  private houseName: string | null = null;
  private houseNameKey = 'houseName';

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
}
