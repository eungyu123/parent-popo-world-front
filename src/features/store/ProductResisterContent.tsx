import { IMAGE_URLS } from "../../constants/constants";
import addIcon from "../../assets/image/common/add-icon.png";

export const ProductResisterContent = ({
  selectedAddProductImage,
  selectedAddProductName,
  selectedAddProductPrice,
  selectedAddProductQuantity,
  setSelectedAddProductImage,
  setSelectedAddProductName,
  setSelectedAddProductPrice,
  setSelectedAddProductQuantity,
  onConfirm,
  onClose,
}: {
  selectedAddProductImage: string;
  selectedAddProductName: string;
  selectedAddProductPrice: string;
  selectedAddProductQuantity: string;
  setSelectedAddProductImage: (image: string) => void;
  setSelectedAddProductName: (name: string) => void;
  setSelectedAddProductPrice: (price: string) => void;
  setSelectedAddProductQuantity: (quantity: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      {/* 제목 */}
      <div className="flex items-center gap-x-1 mb-2">
        <div className="">상품 추가등록</div>
        <img src={addIcon} alt="" className="w-8 h-8 object-contain" />
      </div>
      {/* 상품 이미지, 이름, 가격 설정 */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-5">
        <div className="w-40 h-40 aspect-square bg-main-white-500 flex justify-center items-center self-end border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
          <img src={selectedAddProductImage} alt="" className="w-1/2 h-1/2 object-contain" />
        </div>
        <div className="flex flex-col gap-y-0.5 ">
          <label htmlFor="" className="text-sm text-black">
            상품 이름
          </label>
          <input
            type="text"
            value={selectedAddProductName}
            onChange={(e) => setSelectedAddProductName(e.target.value)}
            className="pl-2 py-0.5 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none"
          />
          <label htmlFor="" className="text-sm text-black mt-3">
            상품 가격
          </label>
          <input
            type="text"
            value={selectedAddProductPrice}
            onChange={(e) => setSelectedAddProductPrice(e.target.value)}
            className="pl-2 py-0.5 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none"
          />
          <label htmlFor="" className="text-sm text-black mt-3">
            상품 개수
          </label>
          <input
            type="text"
            value={selectedAddProductQuantity}
            onChange={(e) => setSelectedAddProductQuantity(e.target.value)}
            className="pl-2 py-0.5 text-sm text-black border border-gray-100 shadow-custom-2 rounded-md focus:outline-none"
          />
        </div>
      </div>
      {/* 기본 이미지들  */}
      <h5 className="text-sm mb-1">기본 이미지</h5>
      <div className="flex gap-x-3.5 pb-2 mb-6 overflow-x-auto scrollbar-hidden">
        {Object.values(IMAGE_URLS.items).map((image, index) => (
          <div
            key={index}
            className="w-15 h-15 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100"
            onClick={() => setSelectedAddProductImage(image)}
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
