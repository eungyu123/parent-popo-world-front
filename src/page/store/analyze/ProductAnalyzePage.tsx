import ShoppingCartIcon from "../../../components/icons/ShoppingCartIcon";
import TrendingUpIcon from "../../../components/icons/TrendingUpIcon";
import AwardIcon from "../../../components/icons/AwardIcon";
import BookIcon from "../../../components/icons/BookOpenIcon";
import DollarSignIcon from "../../../components/icons/DollarSignIcon";
import { WeeklyCategoryTrend } from "./WeeklyCategoryTrend";
import { WeeklySummaryReport } from "./WeeklySummaryReport";
import { HourlyPurchasePattern } from "./HourlyPurchasePattern";
import { WeeklyTopProducts } from "./WeeklyTopProducts";
import { CategorySpendingRatio } from "./CategorySpendingRatio";
import { useAuthStore } from "../../../zustand/auth";
import { useEffect, useState } from "react";
import { getStoreAnalyze } from "../../../api/analyze/store";

export const ProductAnalyzePage = () => {
  const { selectedChildId } = useAuthStore();
  const [analyzeData, setAnalyzeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedChildId) {
      setLoading(true);
      getStoreAnalyze({ child_id: selectedChildId })
        .then((data) => {
          console.log(data);
          setAnalyzeData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
          setLoading(false);
        });
    }
  }, [selectedChildId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!analyzeData) return null;

  const { metrics, weeklyTrend, categoryData, hourlyData, popularProducts, lastUpdated } = analyzeData;

  return (
    <>
      <div className="flex justify-between items-center mb-6 ">
        <div className="text-sm">분석 대시보드</div>
        <div className="text-[0.8rem] text-center text-black border border-gray-300 rounded-sm px-2 py-1 cursor-pointer">
          {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : new Date().toLocaleDateString()}
        </div>
      </div>
      {/* 이번 주 총 소비 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#4ecdc4]">
        <div className="text-sm text-natural-500">이번 주 총 소비</div>
        <div className="text-xl font-bold">{metrics?.thisWeekTotal?.toLocaleString()}원</div>
        <div className="flex gap-x-2">
          <TrendingUpIcon className="w-4 h-4 text-main-green-400" />
          <div className="text-sm text-main-green-400 ">
            {metrics?.weeklyChange > 0
              ? `+${metrics.weeklyChange.toFixed(1)}% 전주 대비`
              : `${metrics.weeklyChange?.toFixed(1)}% 전주 대비`}
          </div>
        </div>
        <div className="text-xs text-natural-500">총 {metrics?.totalPurchases}건 구매</div>
        <ShoppingCartIcon className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 text-[#4ecdc4]" />
      </div>
      {/* 가장 인기 카테고리 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#ff6b6b]">
        <div className="text-sm text-natural-500">가장 인기 카테고리</div>
        <div className="text-xl font-bold">{metrics?.mostPopularCategory}</div>
        <div className="flex gap-x-2">
          <div className="text-sm text-neutral-400 font-light">변화 없음</div>
        </div>
        <div className="text-xs text-natural-400 font-light">총 {metrics?.totalPurchases}건 구매</div>
        <AwardIcon className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 text-[#ff6b6b]" />
      </div>
      {/* 교육 아이템 비중 */}
      <div className="relative flex flex-col px-4 py-4 mb-4 border border-gray-100 shadow-md rounded-lg border-l-4 border-l-[#96ceb4]">
        <div className="text-sm text-natural-500">교육 아이템 비중</div>
        <div className="text-xl font-bold">{metrics?.educationRatio?.toFixed(1)}%</div>
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
        <div className="text-xl font-bold">{metrics?.avgPurchaseAmount?.toLocaleString()}원</div>
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
      <CategorySpendingRatio metrics={metrics} categoryData={categoryData} popularProducts={popularProducts} />
      <div className="">총 {metrics?.totalPurchases}건의 구매 데이터를 분석했습니다.</div>
    </>
  );
};
