import apiClient from "../api";

export interface __InventoryItem {
  productId: string;
  name: string;
  imageUrl: string;
  stock: number;
  type: string;
  exp: number;
  price: number;
  purchasedAt: string;
}

export const getInventory = async (childId: string): Promise<__InventoryItem[]> => {
  const response = await apiClient.get(`/api/store/parent/child-inventory?childId=${childId}`);
  console.log("getInventory", response.data);
  return response.data;
};
