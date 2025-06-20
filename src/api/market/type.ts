// 통합된 상품 타입
export interface ProductItem {
  productId?: string;
  productName?: string;
  price?: number;
  imageUrl?: string;
  childName?: string;
  quantity?: number;
  type?: string;
  label?: string;
  status?: string;
  usedAt?: string;
  purchasedAt?: string;
  updatedAt?: string;
}
