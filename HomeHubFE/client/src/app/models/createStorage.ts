import { StorageType } from "./storageResponse";

export interface CreateStorage {
    name: string;
    type: StorageType;
    description: string;
    parentStorageName?: string;
  }
  