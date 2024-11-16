export interface ItemResponse {
  id: string;
  name: string;
  count: number;
  description: string;
  storageName: string;
  expirationDate?: string;
  warrantyDate?: string;
}