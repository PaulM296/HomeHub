export interface StorageResponse {
    id: string;
    name: string;
    type: StorageType;
    description: string;
    parentStorageId?: string;
}

export enum StorageType {
    House = 'House',
    Room = 'Room',
    Fridge = 'Fridge',
    Deposit = 'Deposit'
}