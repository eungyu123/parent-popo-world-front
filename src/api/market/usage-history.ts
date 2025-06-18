import apiClient from "../api";

export interface UsageHistory {
  usageId: string;
  childName: string;
  productName: string;
  usedAmount: number;
  usedAt: string; // ISO 8601 date string
}

export const getUsageHistory = async (childId: string) => {
  try {
    const response = await apiClient.get(`/api/store/parent/usage-history?childId=${childId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch usage history", error);
    return [];
  }
};
