export interface StorageResponse {
    id: string;
    name: string;
    type: StorageType;
    description: string;
    parentStorageId?: string;
}

export enum StorageType {
    House = 0,
    Room = 1,
    Fridge = 2,
    Deposit = 3
}