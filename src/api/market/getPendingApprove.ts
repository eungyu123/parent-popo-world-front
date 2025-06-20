import apiClient from "../api";
import type { ProductItem } from "./type";

export interface __PendingApproveItem {
  productId: string;
  childName: string;
  productName: string;
  price: number;
  imageUrl: string;
  usedAt: string;
}

// 사용요청 리스트 조회
export const getPendingApprove = async (childId: string): Promise<ProductItem[]> => {
  try {
    const response = await apiClient.get(`/api/store/parent/pending-approvals?childId=${childId}`);
    console.log("getPendingApprove", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pending approvals", error);
    return [];
  }
};
