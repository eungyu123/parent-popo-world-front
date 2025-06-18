import React, { useEffect, useState } from "react";
import { IMAGE_URLS } from "../../../constants/constants";
import coinIcon from "@/assets/image/common/common_coin.webp";
import { ProductChart } from "../../../features/store/ProductChart";
import { useAuthStore } from "../../../zustand/auth";
import { getUsageHistory, type UsageHistory } from "../../../api/market/usage-history";

// 무한 스크롤 구현

export const PurchaseManagementPage: React.FC = () => {
  const { selectedChildId } = useAuthStore();
  const [usageHistory, setUsageHistory] = useState<UsageHistory[]>([]);
  useEffect(() => {
    if (!selectedChildId) return;
    getUsageHistory(selectedChildId).then((res) => {
      setUsageHistory(res);
    });
  }, [selectedChildId]);
  console.log("usageHistory", usageHistory);

  return (
    <>
      {/* 구매 그래프 제목  */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">구매 그래프</span>
        <div className="flex justify-between items-center gap-x-2">
          <span className="text-sm text-gray-800">월간</span>
          <span className="text-sm text-center bg-main-green-700 text-main-white-500 rounded-sm px-2 py-1">주간</span>
        </div>
      </div>
      {/* 구매 그래프 */}
      <ProductChart />
      {/* 구매 건수 제목 */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">구매 건수</span>
        <div className="flex justify-between items-center gap-x-2">
          <span className="text-sm text-gray-800">월간</span>
          <span className="text-sm text-center bg-main-green-700 text-main-white-500 rounded-sm px-2 py-1">주간</span>
        </div>
      </div>
      {/* 구매 건수 리스트 */}
      <div className="flex flex-col gap-y-8 ">
        {/* 구매요청 리스트 */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="relative flex justify-between items-center ">
            {/* 왼쪽 */}
            {index}
            <div className="flex items-center gap-x-4">
              <div className="w-17 h-17 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
                <img src={IMAGE_URLS.items.donut} alt="" className="w-9 h-9" />
              </div>
              <div className="flex flex-col gap-y-1 justify-center items-start ">
                <div className="text-xs text-black">노트북 30분 사용</div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coinIcon} alt="" className="w-3.5 h-3.5 mb-0.5" />
                  <div className="text-xs text-black">1000냥</div>
                </div>
              </div>
            </div>
            {/* 오른쪽 */}
            <div className="flex gap-x-2 items-center">
              <div className="text-xs text-gray-800">2025.05.20</div>
              <div className="text-xs bg-main-green-700 text-main-white-500 rounded-sm px-2 py-1">사용완료</div>
            </div>
            {/* 아래 선 부모 패딩 좌 2rem, 우 2rem 계산후 반영 */}
            <div className="absolute -bottom-5 -left-8 w-[calc(100%_+_4rem)] h-[0.0625rem] bg-gray-200" />
          </div>
        ))}
        <div className="relative flex justify-between items-center ">
          {/* 왼쪽 */}
          <div className="flex items-center gap-x-4">
            <div className="w-17 h-17 aspect-square bg-main-white-500 flex justify-center items-center border-2 border-gray-100 shadow-custom-2 rounded-xl active:scale-95 transition-all duration-100">
              <img src={IMAGE_URLS.items.donut} alt="" className="w-9 h-9" />
            </div>
            <div className="flex flex-col gap-y-1 justify-center items-start ">
              <div className="text-xs text-black">노트북 30분 사용</div>
              <div className="flex items-center gap-x-0.5">
                <img src={coinIcon} alt="" className="w-3.5 h-3.5 mb-0.5" />
                <div className="text-xs text-black">1000냥</div>
              </div>
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="flex gap-x-2 items-center">
            <div className="text-xs text-gray-800">2025.05.20</div>
            <div className="text-xs bg-main-green-700 text-main-white-500 rounded-sm px-2 py-1">사용완료</div>
          </div>
          {/* 아래 선 부모 패딩 좌 2rem, 우 2rem 계산후 반영 */}
          <div className="absolute -bottom-5 -left-8 w-[calc(100%_+_4rem)] h-[0.0625rem] bg-gray-200" />
        </div>
      </div>
    </>
  );
};
