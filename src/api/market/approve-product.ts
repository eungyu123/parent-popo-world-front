import apiClient, { ApiError } from "../api";

export const approveProduct = async (productId: string, childId: string) => {
  try {
    const response = await apiClient.post(`/api/store/parent/approve/${productId}?childId=${childId}`);
    console.log("approveProduct", response.data);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    return false;
  }
};
