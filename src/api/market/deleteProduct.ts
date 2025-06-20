// /api/store/parent/products/{productId}

// productId, childId

import apiClient, { ApiError } from "../api";

interface DeleteProductRequest {
  productId: string;
  childId: string;
}

export const deleteStoreProduct = async ({
  productId,
  childId,
}: DeleteProductRequest): Promise<boolean | undefined> => {
  try {
    const response = await apiClient.delete(`/api/store/parent/products/${productId}?childId=${childId}`);
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
