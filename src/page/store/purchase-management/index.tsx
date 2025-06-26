import React, { useEffect, useState } from "react";
import { IMAGE_URLS } from "../../../constants/constants";
import coinIcon from "@/assets/image/common/common_coin.webp";
import { useAuthStore } from "../../../zustand/auth";
import Pagination from "../../../components/page/Pagination";
import { BottomSheet } from "../../../components/bottom-sheet/BottomSheet";
// api
import { getApprovedHistory } from "../../../api/market/getApprovedHistory";
import { getPendingApprove } from "../../../api/market/getPendingApprove";
import { getInventory } from "../../../api/market/getInventory";
import type { ProductItem } from "../../../api/market/type";
import type { __InventoryItem } from "../../../api/market/getInventory";
import { useQuery } from "@tanstack/react-query";
// 구매 상태 색상
const PURCHASE_STATUS = {
  승인완료: "#78d335",
  승인대기: "#FFBE00",
  구매완료: "#1CB0F7",
};

export const PurchaseManagementPage: React.FC = () => {
  const todayDate = new Date();
  const { selectedChildId } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>(
    `${todayDate.getFullYear()}.${(todayDate.getMonth() + 1).toString().padStart(2, "0")}`
  );
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(todayDate.getFullYear());
  const itemsPerPage = 10;

  // 상품 데이터 조회
  const fetchPurchaseManagementData = async (childId: string) => {
    const approveHistory: ProductItem[] = await getApprovedHistory(childId);
    const updatedApproveHistory: ProductItem[] = approveHistory.map((item) => ({
      ...item,
      status: "승인완료",
      updatedAt: item.usedAt,
    }));

    const pendingApprove: ProductItem[] = await getPendingApprove(childId);
    const updatedPendingApprove: ProductItem[] = pendingApprove.map((item) => ({
      ...item,
      status: "승인대기",
      updatedAt: item.usedAt,
    }));

    const inventory: __InventoryItem[] = await getInventory(childId);
    const updatedInventory: ProductItem[] = inventory.map((item) => ({
      productId: item.productId,
      productName: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      status: "구매완료",
      updatedAt: item.purchasedAt,
    }));

    const allItems = [...updatedApproveHistory, ...updatedPendingApprove, ...updatedInventory];
    allItems.sort((a, b) => {
      const dateA = new Date(a.updatedAt || "");
      const dateB = new Date(b.updatedAt || "");
      return dateB.getTime() - dateA.getTime();
    });
    return allItems;
  };

  const { data: items } = useQuery({
    queryKey: ["purchase-management", selectedChildId],
    queryFn: () => fetchPurchaseManagementData(selectedChildId || ""),
    enabled: !!selectedChildId,
  });

  // 날짜 필터링된 아이템들
  const filteredItems = items?.filter((item) => {
    const itemDate = new Date(item.updatedAt || "");
    const itemYear = itemDate.getFullYear();
    const itemMonth = itemDate.getMonth() + 1;

    const [selectedYearFromDate, selectedMonth] = selectedDate.split(".").map(Number);

    return itemYear === selectedYearFromDate && itemMonth === selectedMonth;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil((filteredItems?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems?.slice(startIndex, endIndex) || [];

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 날짜 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

  // 월 선택 핸들러
  const handleMonthSelect = (month: number) => {
    setSelectedDate(`${selectedYear}.${month.toString().padStart(2, "0")}`);
    setBottomSheetOpen(false);
  };

  // 년도 변경 핸들러
  const handleYearChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedYear(selectedYear + 1);
    }
  };

  // 월 리스트 생성 (1-12월)
  const generateMonthList = () => {
    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push({
        month,
        displayText: `${month}월`,
      });
    }
    return months;
  };

  return (
    <>
      <BottomSheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <div className="flex flex-col">
          {/* 년도 선택 */}
          <div className="flex items-center justify-between mb-6 px-4">
            <button
              onClick={() => handleYearChange("prev")}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-lg font-medium">{selectedYear}년</div>
            <button
              onClick={() => handleYearChange("next")}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            {generateMonthList().map(({ month, displayText }) => (
              <div
                key={month}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedDate === `${selectedYear}.${month.toString().padStart(2, "0")}`
                    ? "bg-main-green-700 text-white border-main-green-700"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleMonthSelect(month)}
              >
                <div className="text-center">{displayText}</div>
              </div>
            ))}
          </div>
        </div>
      </BottomSheet>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">구매 건수</span>
        <span
          className="text-[0.8rem] text-center text-black border border-gray-300 rounded-sm px-2 py-1 cursor-pointer"
          onClick={() => setBottomSheetOpen(true)}
        >
          {selectedDate.split(".")[0]}년 {selectedDate.split(".")[1]}월
        </span>
      </div>
      {/* 구매 건수 리스트 */}
      <div className="flex flex-col gap-y-8 ">
        {/* 구매요청 리스트 */}
        {currentItems.map((item) => (
          <div className="relative flex justify-between items-center ">
            {/* 왼쪽 */}
            <div className="flex items-center gap-x-4">
              <div className="w-17 h-17 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
                <img src={IMAGE_URLS.items.donut} alt="" className="w-9 h-9" />
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
                className="text-xs text-main-white-500 rounded-sm px-2 py-1"
                style={{ backgroundColor: PURCHASE_STATUS[item.status as keyof typeof PURCHASE_STATUS] }}
              >
                {item.status}
              </div>
            </div>
            {/* 아래 선 부모 패딩 좌 2rem, 우 2rem 계산후 반영 */}
            <div className="absolute -bottom-5 -left-8 w-[calc(100%_+_4rem)] h-[0.0625rem] bg-gray-200" />
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
