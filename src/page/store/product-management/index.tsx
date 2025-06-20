import React, { useEffect, useRef, useState } from "react";
import { AddButton } from "../../../components/button/AddButton";
import { BottomSheet } from "../../../components/bottom-sheet/BottomSheet";
import { IMAGE_URLS } from "../../../constants/constants";
import coinIcon from "@/assets/image/common/common_coin.webp";
import { ProductResisterContent } from "../../../features/store/ProductResisterContent";
import { createStoreProduct } from "../../../api/market/registerProduct";
import { useAuthStore } from "../../../zustand/auth";
import { getStoreItems } from "../../../api/market/getStoreItems";
import { deleteStoreProduct } from "../../../api/market/deleteProduct";
import { LABEL_LIST } from "../../../api/market/registerProduct";
import type { ProductItem } from "../../../api/market/type";
import type { __ProductItem } from "../../../api/market/getStoreItems";

export const ProductManagementPage: React.FC = () => {
  const [isAddProductBottomSheetOpen, setIsAddProductBottomSheetOpen] = useState(false);
  const [isEditProductBottomSheetOpen, setIsEditProductBottomSheetOpen] = useState(false);
  const [selectedAddProduct, setSelectedAddProduct] = useState<ProductItem | null>({
    productName: "",
    price: 0,
    imageUrl: IMAGE_URLS.items.donut,
    label: "",
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<ProductItem[]>([]);
  const { selectedChildId } = useAuthStore();

  useEffect(() => {
    if (!selectedChildId) return;
    getStoreItems(selectedChildId).then((res) => {
      const productItems: ProductItem[] = res.map((item: __ProductItem) => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        label: item.label,
      }));
      setItems(productItems);
    });
  }, [selectedChildId]);

  const handleProductClick = (product: ProductItem) => {
    console.log("handleProductClick", product);
    setSelectedProduct(product);
    setIsEditProductBottomSheetOpen(true);
  };

  const handleAddProduct = async () => {
    if (!selectedChildId) return;

    await createStoreProduct({
      childId: selectedChildId,
      productName: selectedAddProduct?.productName || "",
      productPrice: selectedAddProduct?.price || 0,
      productImage: selectedAddProduct?.imageUrl || "",
      label: selectedAddProduct?.label || "",
    });

    setIsAddProductBottomSheetOpen(false);
  };

  const handleCreateProductModalClose = () => {
    setIsAddProductBottomSheetOpen(false);
    setSelectedAddProduct({
      productName: "",
      price: 0,
      imageUrl: IMAGE_URLS.items.donut,
      label: "",
    });
  };

  const handleDeleteProduct = async () => {
    if (!selectedChildId || !selectedProduct) return;
    const response = await deleteStoreProduct({
      childId: selectedChildId,
      productId: selectedProduct?.productId || "",
    });
    console.log("삭제 response", response);
    setIsEditProductBottomSheetOpen(false);
  };

  return (
    <>
      {/* 상품 추가 등록 */}
      <h5 className="text-sm mb-1">상품 등록하기</h5>
      <AddButton text="상품 추가 등록" onClick={() => setIsAddProductBottomSheetOpen(true)} />

      {/* 상품 조회 */}
      <h5 className="text-sm mb-1">상품 조회하기</h5>
      <div className="grid grid-cols-3 gap-x-8 gap-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex flex-col gap-y-2" onClick={() => handleProductClick(item)}>
            <div className="relative flex w-full aspect-square bg-main-white-500 justify-center items-center border-2 border-gray-100 text-lg shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
              <img src={item.imageUrl} alt={item.productName} className="w-1/2 h-1/2 object-contain" />
              {/* 라벨 */}
              {item.label && (
                <div className="absolute top-1 right-1 bg-main-green-400 text-main-white-500 text-xs rounded-full px-1 py-0.5">
                  {LABEL_LIST[item.label as keyof typeof LABEL_LIST]}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-0.5 px-0.5">
              <span className="text-xs text-black">{item.productName}</span>
              <div className="flex gap-1 items-center">
                <img src={coinIcon} alt="" className="w-3 h-3 object-contain" />
                <span className="text-xs text-black ">{item.price}냥</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 상품 추가 Bottom Sheet */}
      <BottomSheet isOpen={isAddProductBottomSheetOpen} onClose={handleCreateProductModalClose}>
        <ProductResisterContent
          selectedAddProduct={selectedAddProduct}
          setSelectedAddProduct={setSelectedAddProduct}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownRef={dropdownRef}
          onConfirm={handleAddProduct}
          onClose={handleCreateProductModalClose}
        />
      </BottomSheet>
      {/* 상품 수정 Bottom Sheet */}
      <BottomSheet isOpen={isEditProductBottomSheetOpen} onClose={() => setIsEditProductBottomSheetOpen(false)}>
        {/* 제목 */}
        <div className="flex items-center gap-x-1 mb-2">
          <div className="">상품 조회</div>
        </div>
        {/* 상품 이미지, 이름, 가격 설정 */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-5">
          <div className="w-40 h-40 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
            <img src={selectedProduct?.imageUrl} alt="" className="w-1/2 h-1/2 object-contain" />
          </div>
          <div className="flex flex-col gap-y-1 py-3">
            <label htmlFor="" className="text-sm text-black">
              상품 이름
            </label>
            <div className="pl-2 py-1 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none">
              {selectedProduct?.productName}
            </div>
            <label htmlFor="" className="text-sm text-black mt-3">
              상품 가격
            </label>
            <div className="pl-2 py-1 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none">
              {selectedProduct?.price}냥
            </div>
          </div>
        </div>

        {/* 상품 등록, 취소 버튼 */}
        <div className="grid grid-cols-2 gap-x-2 w-full ">
          <div
            className="text-center bg-main-red-500 text-main-white-500 text-sm rounded-xl py-3 shadow-custom-2"
            onClick={handleDeleteProduct}
          >
            삭제
          </div>
          <div
            className="text-center bg-main-white-500 text-black text-sm rounded-xl py-3 shadow-custom-2"
            onClick={() => setIsEditProductBottomSheetOpen(false)}
          >
            취소
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
