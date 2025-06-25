import { useState } from "react";
// import clsx from "clsx";
import StayTimeGraph from "./StayTimeGraph";
import TradingRatioGraph1 from "./TradingRatioGraph1";
import TradingRatioGraph2 from "./TradingRatioGraph2";
import TradingRatioGraph3 from "./TradingRatioGraph3";
import BettingSuccessGraph from "./BettingSuccessGraph";
import BalanceTrendGraph from "./BalanceTrendGraph";
import { useQuery } from "@tanstack/react-query";
import { getInvestAnalyze } from "../../../api/analyze/invest";
import { useAuthStore } from "../../../zustand/auth";
import { ChildNavBar } from "../../../components/nav-bar/ChildNavBar";

// avg_stay_time
// buy_ratio
// sell_ratio
// buy_sell_ratio
// bet_ratio
// avg_cash_ratio
// invest_style

export const investTypes: Record<string, { title: string; color: string }> = {
  avg_stay_time: {
    title: "평균 턴 체류시간",
    color: "#1DB3FB",
  },
  buy_ratio: {
    title: "구매 비율",
    color: "#78D335",
  },
  sell_ratio: {
    title: "판매 비율",
    color: "#FF9600",
  },
  buy_sell_ratio: {
    title: "구매 판매 비율",
    color: "#4D4B4D",
  },
  bet_ratio: {
    title: "배팅 성공률",
    color: "#C57CF0",
  },
  avg_cash_ratio: {
    title: "여유자금 추이",
    color: "#FE4A4E",
  },
  // invest_style: {
  //   title: "투자 성향",
  //   color: "#FFBE00",
  // },
};

export const InvestAnalyzePage: React.FC = () => {
  const [selectedAnalyzeType, setSelectedAnalyzeType] = useState<string>("buy_ratio");
  const [selectedAnalyzePeriod, setSelectedAnalyzePeriod] = useState<"all" | "week">("all");
  const { selectedChildId } = useAuthStore();

  const { data: investAnalyzeData } = useQuery({
    queryKey: ["investAnalyze", selectedAnalyzeType, selectedAnalyzePeriod],
    queryFn: () =>
      getInvestAnalyze({
        graph: selectedAnalyzeType,
        range: selectedAnalyzePeriod,
        selectedChildId: selectedChildId || "",
      }),
    enabled: !!selectedAnalyzeType && !!selectedAnalyzePeriod && !!selectedChildId,
  });

  const AnalyzeGraph = () => {
    if (selectedAnalyzeType === "avg_stay_time") {
      // 체류시간
      return <StayTimeGraph />;
    } else if (selectedAnalyzeType === "buy_ratio") {
      // 구매 판매 비율
      return <TradingRatioGraph1 />;
    } else if (selectedAnalyzeType === "sell_ratio") {
      // 구매 판매 비율
      return <TradingRatioGraph2 />;
    } else if (selectedAnalyzeType === "buy_sell_ratio") {
      // 구매 판매 비율
      return <TradingRatioGraph3 />;
    } else if (selectedAnalyzeType === "bet_ratio") {
      // 배팅 성공률
      return <BettingSuccessGraph />;
    } else if (selectedAnalyzeType === "avg_cash_ratio") {
      // 여유자금 추이
      return <BalanceTrendGraph selectedAnalyzeType={selectedAnalyzeType} />;
    }
  };

  return (
    <>
      <ChildNavBar />
      {/* 분석 종류 */}
      <div className="text-sm mb-2">분석 종류</div>
      <div className="flex gap-x-3.5 pb-2 mb-6  overflow-x-auto scrollbar-hidden">
        {Object.entries(investTypes).map(([key, investType], index) => (
          <div
            key={index}
            className="px-2 py-1 text-main-white-500 rounded-sm text-xs whitespace-nowrap"
            style={{ backgroundColor: investType.color }}
            onClick={() => setSelectedAnalyzeType(key as keyof typeof investTypes)}
          >
            {investType.title}
          </div>
        ))}
      </div>

      {/* 그래프 설명 영역 */}
      <div className="flex justify-between items-center mb-5">
        <div className="text-sm">{investTypes[selectedAnalyzeType].title}</div>
        <div className="flex justify-between bg-gray-100 rounded-xl p-1">
          {[
            { label: "전체", value: "all" as const },
            { label: "주간", value: "week" as const },
          ].map((period) => (
            <button
              key={period.value}
              className={`flex-1 py-1 px-3 rounded-lg text-sm font-semibold transition ${
                selectedAnalyzePeriod === period.value ? "bg-white shadow" : ""
              }`}
              style={{
                color: selectedAnalyzePeriod === period.value ? investTypes[selectedAnalyzeType].color : "#99a1af",
              }}
              onClick={() => setSelectedAnalyzePeriod(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {AnalyzeGraph()}

      {/* 아래 선 부모 패딩 좌 2rem, 우 2rem 계산후 반영 */}
      <div className="my-6 -ml-8 w-[calc(100%_+_4rem)] h-[0.0625rem] bg-gray-200 " />

      {/* 분석 결과 */}
      <div className="text-sm font-bold mb-2">분석 결과</div>
      <div className="text-xs">분석결과 현재 자녀는 매우 공격적입니다. 분석결과 현재 자녀는 매우 공격적입니다.</div>
    </>
  );
};
