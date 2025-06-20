import apiClient from "../api";
import type { ProductItem } from "./type";

export interface __ApprovedHistoryItem {
  productId: string;
  childName: string;
  productName: string;
  price: number;
  imageUrl: string;
  usedAt: string;
}

export const getApprovedHistory = async (childId: string): Promise<ProductItem[]> => {
  try {
    const response = await apiClient.get(`/api/store/parent/approved-history?childId=${childId}`);
    console.log("getApproveHistory", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch approved history", error);
    return [];
  }
};
