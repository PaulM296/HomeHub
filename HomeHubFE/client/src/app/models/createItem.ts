export interface CreateItem {
  name: string;
  count: number;
  description: string;
  storageName: string;
  expirationDate?: string;
  warrantyDate?: string;
}