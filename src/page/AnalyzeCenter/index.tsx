import { Link } from "react-router-dom";
import investIcon from "../../assets/image/common/stock.png";
import popoStockIcon from "../../assets/image/common/popo_stock.png";
import storeIcon from "../../assets/image/common/store.png";
import questIcon from "../../assets/image/common/quest.png";

export const AnalyzeCenterPage = () => {
  // 더미 데이터
  const analysisData = {
    invest: {
      title: "모의투자 분석",
    },
    store: {
      title: "상점 분석",
    },
    quest: {
      title: "퀘스트 분석",
    },
  };

  return (
    <>
      {/* 헤더 */}
      <p className="text-sm text-gray-600 mb-6 ">자녀의 금융 활동을 한눈에 확인하세요</p>

      {/* 분석 카드 3개 */}
      <div className="grid grid-cols-1 gap-4">
        {/* 모의투자 분석 */}
        <Link to="/analyze/invest" className="block">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* 제목 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 ">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <img src={popoStockIcon} alt="" className="w-11" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">모의투자 분석</h3>
                  <p className="text-sm text-gray-600">투자 성과 및 패턴 분석</p>
                </div>
              </div>
            </div>
            {/* 내용 */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-400">→ 상세보기</span>
            </div>
          </div>
        </Link>

        {/* 상점 분석 */}
        <Link to="/analyze/store" className="block">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <img src={storeIcon} alt="" className="w-11" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">상점 분석</h3>
                  <p className="text-sm text-gray-600">구매 패턴 및 소비 분석</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-400">→ 상세보기</span>
            </div>
          </div>
        </Link>

        {/* 퀘스트 분석 */}
        <Link to="/analyze/quest" className="block">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <img src={questIcon} alt="" className="w-11" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">퀘스트 분석</h3>
                  <p className="text-sm text-gray-600">퀘스트 달성 및 활동 분석</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-400">→ 상세보기</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
