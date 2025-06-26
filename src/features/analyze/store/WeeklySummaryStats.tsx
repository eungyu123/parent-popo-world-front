interface Metrics {
  thisWeekTotal: number;
  weeklyChange: number;
  mostPopularCategory: string;
  educationRatio: number;
  totalPurchases: number;
  avgPurchaseAmount: number;
}

const metrics: Metrics = {
  thisWeekTotal: 3186,
  weeklyChange: 574.1052631578948,
  mostPopularCategory: "장난감",
  educationRatio: 16.135693215339235,
  totalPurchases: 21,
  avgPurchaseAmount: 151.71428571428572,
};

export const WeeklySummaryStats = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 주간 요약 리포트</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{metrics.totalPurchases}</p>
          <p className="text-sm text-blue-800">총 구매 건수</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{metrics.thisWeekTotal.toLocaleString()}</p>
          <p className="text-sm text-green-800">총 소비 금액 (원)</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{Math.round(metrics.avgPurchaseAmount).toLocaleString()}</p>
          <p className="text-sm text-purple-800">평균 구매 금액 (원)</p>
        </div>
      </div>

      {/* 추가 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <p className="text-2xl font-bold text-orange-600">{metrics.mostPopularCategory}</p>
          <p className="text-sm text-orange-800">가장 인기 카테고리</p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-2xl font-bold text-red-600">
            {metrics.weeklyChange > 0 ? "+" : ""}
            {Math.round(metrics.weeklyChange)}%
          </p>
          <p className="text-sm text-red-800">전주 대비 변화율</p>
        </div>
      </div>
    </div>
  );
};
