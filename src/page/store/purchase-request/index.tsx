import React, { useEffect, useState } from "react";
import coinIcon from "@/assets/image/common/common_coin.webp";
import { getPendingApprove } from "../../../api/market/getPendingApprove";
import { useAuthStore } from "../../../zustand/auth";
import { approveProduct } from "../../../api/market/approve-product";
import type { ProductItem } from "../../../api/market/type";
import clsx from "clsx";
import Pagination from "../../../components/page/Pagination";

// 무한 스크롤 구현
export const PurchaseRequestPage: React.FC = () => {
  const { selectedChildId } = useAuthStore();
  const [pendingApprovals, setPendingApprovals] = useState<ProductItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 구매요청 리스트 조회
  useEffect(() => {
    if (!selectedChildId) return;
    getPendingApprove(selectedChildId).then((res) => {
      setPendingApprovals(res);
    });
  }, [selectedChildId]);

  // 상품 사용 확인
  const handleApprove = (productId: string) => {
    if (!selectedChildId || !productId) return;
    approveProduct(productId, selectedChildId);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(pendingApprovals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = pendingApprovals.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 상품 사용 확인 후 리스트 업데이트
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">상품 사용 확인</span>
      </div>
      <div className="flex flex-col gap-y-8 ">
        {/* 구매요청 리스트 */}
        {currentItems.map((item) => (
          <div className="relative flex justify-between items-center ">
            {/* 왼쪽 */}
            <div className="flex items-center gap-x-4">
              <div className="w-17 h-17 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
                <img src={item.imageUrl} alt="" className="w-9 h-9" />
              </div>
              <div className="flex flex-col gap-y-1 justify-center items-start ">
                <div className="text-xs text-black">{item.productName}</div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coinIcon} alt="" className="w-3.5 h-3.5 mb-0.5" />
                  <div className="text-xs text-black">{item.price}냥</div>
                </div>
              </div>
            </div>
            {/* 오른쪽 */}
            <div className="flex gap-x-2 items-center">
              <div className="text-xs text-gray-700 px-2 py-1 bg-gray-200 rounded-md">{item.usedAt}</div>
              <div
                className="text-xs bg-main-green-700  text-main-white-500 rounded-sm px-2 py-1"
                onClick={() => handleApprove(item.productId || "")}
              >
                확인
              </div>
            </div>
            {/* 아래 선 부모 패딩 좌 2rem, 우 2rem 계산후 반영 */}
            <div className="absolute -bottom-5 -left-8 w-[calc(100%_+_4rem)] h-[0.0625rem] bg-gray-200"></div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </>
  );
};
