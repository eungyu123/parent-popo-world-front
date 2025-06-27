import apiClient, { ApiError } from "../api";
import type { ProductItem } from "./type";

interface StoreProductRequest {
  childId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  label: string;
}

//  간식, 오락, 장난감, 교육 및 문구, 기타
export const LABEL_LIST = {
  FOOD: "먹이",
  SNACK: "간식",
  ENTERTAINMENT: "오락",
  TOY: "장난감",
  EDUCATION: "교육 및 문구",
  ETC: "기타",
};

const REVERSE_LABEL_LIST = Object.fromEntries(Object.entries(LABEL_LIST).map(([key, value]) => [value, key]));

// 상품 등록
export const createStoreProduct = async ({
  childId,
  productName,
  productPrice,
  productImage,
  label,
}: StoreProductRequest): Promise<ProductItem | undefined> => {
  try {
    const response = await apiClient.post<ProductItem>("/api/store/parent/products", {
      childId,
      productName,
      productPrice,
      productImage,
      label: REVERSE_LABEL_LIST[label],
    });
    console.log("response", response);
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
