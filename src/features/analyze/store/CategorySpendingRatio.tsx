import React from "react";

interface Metrics {
  thisWeekTotal: number;
  weeklyChange: number;
  mostPopularCategory: string;
  educationRatio: number;
  totalPurchases: number;
  avgPurchaseAmount: number;
}

interface CategorySpendingRatioProps {
  metrics: Metrics;
  categoryData: { name: string; value: number; color: string }[];
  popularProducts: { name: string; category: string; count: number; totalAmount: number; avgPrice: number }[];
}

export const CategorySpendingRatio = ({ metrics, categoryData, popularProducts }: CategorySpendingRatioProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 카테고리별 소비 비율</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{metrics.totalPurchases}</p>
          <p className="text-sm text-blue-800">총 구매 건수</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{categoryData.length}</p>
          <p className="text-sm text-green-800">구매한 카테고리</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{popularProducts.length}</p>
          <p className="text-sm text-purple-800">구매한 상품 종류</p>
        </div>
      </div>
    </div>
  );
};
