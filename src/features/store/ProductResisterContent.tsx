import { IMAGE_URLS } from "../../constants/constants";
import addIcon from "../../assets/image/common/add-icon.png";
import { useEffect } from "react";
import { LABEL_LIST } from "../../api/market/registerProduct";
import type { ProductItem } from "../../api/market/type";
import clsx from "clsx";
import { PlusIcon } from "../../components/icons/PlusIcon";

export const ProductResisterContent = ({
  selectedAddProduct,
  setSelectedAddProduct,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  onConfirm,
  onClose,
}: {
  selectedAddProduct: ProductItem | null;
  setSelectedAddProduct: (product: ProductItem) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 제목 */}
      <div className="flex justify-between items-center gap-x-1 mb-2">
        <div className="flex items-center gap-x-1">
          <div className="">상품 추가등록</div>
          <img src={addIcon} alt="" className="w-8 h-8 object-contain" />
        </div>
        {/* 상품 카테고리 드롭다운 */}
        <div
          ref={dropdownRef}
          className="relative min-w-28 h-8 border border-gray-100 shadow-custom-2 rounded-md bg-white cursor-pointer"
        >
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center w-full h-full border-0 outline-none pl-3 pr-8 bg-transparent cursor-pointer text-sm text-black"
          >
            {selectedAddProduct?.label || "선택하세요"}
          </button>
          <div className="absolute top-0 right-0 w-8 h-full border-l border-gray-100 flex justify-center items-center">
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul
            className={`absolute top-full left-0 w-full bg-white border border-gray-100 shadow-custom-2 rounded-md mt-1 list-none p-0 overflow-hidden transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            {Object.values(LABEL_LIST).map((label) => (
              <li
                key={label}
                onClick={() => {
                  setSelectedAddProduct({ ...selectedAddProduct, label } as ProductItem);
                  setIsDropdownOpen(false);
                }}
                className={clsx(
                  "border-b border-gray-100 py-2 px-3 text-sm text-black hover:bg-gray-50 transition-colors duration-100 cursor-pointer last:border-b-0",
                  selectedAddProduct?.label === label ? "bg-gray-100" : ""
                )}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
        {/* 상품 카테고리 드롭다운 끝 */}
      </div>
      {/* 상품 이미지, 이름, 가격 설정 */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-5">
        <div className="w-40 h-40 aspect-square bg-main-white-500 flex justify-center items-center self-end border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
          <img
            src={
              selectedAddProduct?.image
                ? URL.createObjectURL(selectedAddProduct.image)
                : selectedAddProduct?.imageUrl || ""
            }
            alt=""
            className="w-1/2 h-1/2 object-contain"
          />
        </div>
        <div className="flex flex-col gap-y-0.5 ">
          <label htmlFor="" className="text-sm text-black">
            상품 이름
          </label>
          <input
            type="text"
            value={selectedAddProduct?.productName}
            onChange={(e) =>
              setSelectedAddProduct({ ...selectedAddProduct, productName: e.target.value } as ProductItem)
            }
            className="pl-2 py-0.5 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none"
          />
          <label htmlFor="" className="text-sm text-black mt-3">
            상품 가격
          </label>
          <input
            type="text"
            value={selectedAddProduct?.price}
            onChange={(e) => {
              const value = e.target.value;
              // 숫자만 허용하는 정규식
              const numericValue = value.replace(/[^0-9]/g, "");
              setSelectedAddProduct({
                ...selectedAddProduct,
                price: numericValue === "" ? 0 : Number(numericValue),
              } as ProductItem);
            }}
            className="pl-2 py-0.5 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none"
            placeholder="숫자만 입력"
          />
        </div>
      </div>
      {/* 기본 이미지들  */}
      <h5 className="text-sm mb-1">기본 이미지</h5>
      <div className="flex gap-x-3.5 pb-2 pr-2 mb-6 overflow-x-auto scrollbar-hidden">
        <label className="w-15 h-15 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSelectedAddProduct({
                ...selectedAddProduct,
                image: e.target.files?.[0] ?? null,
                imageUrl: undefined,
              } as ProductItem)
            }
            className="hidden"
          />
          <PlusIcon />
        </label>

        {Object.values(IMAGE_URLS.items).map((image, index) => (
          <div
            key={index}
            className="w-15 h-15 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100"
            onClick={() =>
              setSelectedAddProduct({
                ...selectedAddProduct,
                image: null,
                imageUrl: image,
              } as ProductItem)
            }
          >
            <img src={image} alt="" className="w-1/2 h-1/2 object-contain" />
          </div>
        ))}
      </div>
      {/* 상품 등록, 취소 버튼 */}
      <div className="grid grid-cols-2 gap-x-2 w-full ">
        <div
          className="text-center bg-main-green-400 text-main-white-500 text-sm rounded-xl py-3 shadow-custom-2 active:scale-95 transition-all duration-100"
          onClick={onConfirm}
        >
          상품 등록
        </div>
        <div
          className="text-center bg-main-white-500 text-black text-sm rounded-xl py-3 shadow-custom-2 active:scale-95 transition-all duration-100"
          onClick={onClose}
        >
          취소
        </div>
      </div>
    </>
  );
};
