import apiClient, { ApiError } from "../api";

interface StoreProductRequest {
  childId: string;
  productName: string;
  productPrice: number;
  productStock: number;
  productImage: string;
}

interface StoreProductResponse {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
  imageUrl: string;
}

export const createStoreProduct = async ({
  childId,
  productName,
  productPrice,
  productStock,
  productImage,
}: StoreProductRequest): Promise<StoreProductResponse | undefined> => {
  try {
    const response = await apiClient.post<StoreProductResponse>("/api/store/parent/products", {
      childId,
      productName,
      productPrice,
      productStock,
      productImage,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    return undefined;
  }
};
