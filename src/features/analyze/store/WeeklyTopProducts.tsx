interface PopularProduct {
  name: string;
  category: string;
  count: number;
  totalAmount: number;
  avgPrice: number;
}

interface WeeklyTopProductsProps {
  data: PopularProduct[];
}

export const WeeklyTopProducts = ({ data }: WeeklyTopProductsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 이번 주 인기 상품 TOP 5</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {data.map((product, index) => (
          <div
            key={`product-${index}`}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-500 w-8">{index + 1}</span>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{product.count}개</p>
              <p className="text-sm text-gray-500">{Math.round(product.avgPrice).toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
