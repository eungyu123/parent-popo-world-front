import ShoppingCartIcon from "../../../components/icons/ShoppingCartIcon";
import TrendingUpIcon from "../../../components/icons/TrendingUpIcon";
import AwardIcon from "../../../components/icons/AwardIcon";
import BookIcon from "../../../components/icons/BookOpenIcon";
import DollarSignIcon from "../../../components/icons/DollarSignIcon";
import { WeeklyCategoryTrend } from "../../../features/analyze/store/WeeklyCategoryTrend";
import { WeeklySummaryReport } from "../../../features/analyze/store/WeeklySummaryReport";
import { HourlyPurchasePattern } from "../../../features/analyze/store/HourlyPurchasePattern";
import { WeeklyTopProducts } from "../../../features/analyze/store/WeeklyTopProducts";
import { CategorySpendingRatio } from "../../../features/analyze/store/CategorySpendingRatio";
import { useAuthStore } from "../../../zustand/auth";
import { getStoreAnalyze } from "../../../api/analyze/store";
import { useQuery } from "@tanstack/react-query";

export const ProductAnalyzePage = () => {
  const { selectedChildId } = useAuthStore();

  const { data: storeAnalyzeData, isSuccess } = useQuery({
    queryKey: ["storeAnalyze", selectedChildId],
    queryFn: () => getStoreAnalyze({ child_id: selectedChildId || "" }),
    enabled: !!selectedChildId,
  });

  const {
    metrics,
    weeklyTrend,
    categoryData,
    hourlyData,
    popularProducts,
    lastUpdated,
  } = storeAnalyzeData || {};

  if (!isSuccess) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-6 ">
        <div className="text-sm">분석 대시보드</div>
        <div className="text-[0.8rem] text-center text-black border border-gray-300 rounded-sm px-2 py-1 cursor-pointer">
          {lastUpdated
            ? new Date(lastUpdated).toLocaleDateString()
            : new Date().toLocaleDateString()}
        </div>
      </div>
      {/* 이번 주 총 소비 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#4ecdc4]">
        <div className="text-sm text-natural-500">이번 주 총 소비</div>
        <div className="text-xl font-bold">
          {metrics?.thisWeekTotal?.toLocaleString()}원
        </div>
        <div className="flex gap-x-2">
          <TrendingUpIcon className="w-4 h-4 text-main-green-400" />
          <div className="text-sm text-main-green-400 ">
            {metrics?.weeklyChange > 0
              ? `+${metrics.weeklyChange.toFixed(1)}% 전주 대비`
              : `${metrics.weeklyChange?.toFixed(1)}% 전주 대비`}
          </div>
        </div>
        <div className="text-xs text-natural-500">
          총 {metrics?.totalPurchases}건 구매
        </div>
        <ShoppingCartIcon className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 text-[#4ecdc4]" />
      </div>
      {/* 가장 인기 카테고리 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#ff6b6b]">
        <div className="text-sm text-natural-500">가장 인기 카테고리</div>
        <div className="text-xl font-bold">{metrics?.mostPopularCategory}</div>
        <div className="flex gap-x-2">
          <div className="text-sm text-neutral-400 font-light">변화 없음</div>
        </div>
        <div className="text-xs text-natural-400 font-light">
          총 {metrics?.totalPurchases}건 구매
        </div>
        <AwardIcon className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 text-[#ff6b6b]" />
      </div>
      {/* 교육 아이템 비중 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#96ceb4]">
        <div className="text-sm text-natural-500">교육 아이템 비중</div>
        <div className="text-xl font-bold">
          {metrics?.educationRatio?.toFixed(1)}%
        </div>
        <div className="flex gap-x-2">
          <TrendingUpIcon className="w-4 h-4 text-main-green-400" />
          <div className="text-sm text-main-green-400">-</div>
        </div>
        <div className="text-xs text-natural-500">권장: 20% 이상</div>
        <BookIcon className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 text-[#96ceb4]" />
      </div>
      {/* 평균 구매 단가 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#45b7d1]">
        <div className="text-sm text-natural-500">평균 구매 단가</div>
        <div className="text-xl font-bold">
          {metrics?.avgPurchaseAmount?.toLocaleString()}원
        </div>
        <div className="flex gap-x-2">
          <div className="text-sm text-neutral-400 font-light">변화 없음</div>
        </div>
        <div className="text-xs text-natural-500">건당 평균 금액</div>
        <DollarSignIcon className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 text-[#45b7d1]" />
      </div>
      {/* 주간 카테고리별 소비 추이 */}
      <WeeklyCategoryTrend data={weeklyTrend} />
      {/* 카테고리별 소비 비율 */}
      <WeeklySummaryReport data={categoryData} />
      {/* 시간대별 구매 패턴 */}
      <HourlyPurchasePattern data={hourlyData} />
      {/* 이번주 인기 상품 TOP 5 */}
      <WeeklyTopProducts data={popularProducts} />
      {/* 카테고리별 소비 비율 */}
      <CategorySpendingRatio
        metrics={metrics}
        categoryData={categoryData}
        popularProducts={popularProducts}
      />
      <div className="">
        총 {metrics?.totalPurchases}건의 구매 데이터를 분석했습니다.
      </div>
    </>
  );
};
