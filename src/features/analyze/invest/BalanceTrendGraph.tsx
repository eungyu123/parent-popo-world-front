import { LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, ReferenceLine } from "recharts";
import { investTypes } from "../../../page/AnalyzeCenter/invest/index";
import { type BalanceTrendGraphProps } from "./types";
import LegendIcon from "../../../components/icons/Legend";
import { useRef, useState, useEffect } from "react";

// DummyData 배열에 추가

export default function BalanceTrendGraph({ BalanceTrendData }: { BalanceTrendData: BalanceTrendGraphProps[] }) {
  const processedData = BalanceTrendData.map((item, index) => ({
    gameId: index + 1,
    avgCashRatio: item.avgCashRatio * 100,
  }));
  const avgCashRatioMean = BalanceTrendData[0].avgCashRatioMean * 100;

  // 데이터 개수에 따른 너비 계산 함수
  const getWidthClass = (dataLength: number) => {
    return `${dataLength > 50 ? 100 + dataLength * 0.7 : 100}%`;
  };

  const getContainerWidth = (dataLength: number) => {
    return dataLength > 50 ? "calc(100% + 3.5rem)" : "calc(100% + 3rem)";
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [legendOffset, setLegendOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        setLegendOffset(scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className="h-[24rem] -ml-9 text-xs overflow-x-auto scrollbar-hidden"
      style={{ width: getContainerWidth(processedData.length) }}
      ref={scrollContainerRef}
    >
      <div className={`relative`} style={{ width: getWidthClass(processedData.length), height: "100%" }}>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={processedData} margin={{ top: 40, right: 10, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="gameId"
              label={{ value: "게임 수", position: "right", offset: -30, dy: 8, dx: 2 }}
              ticks={(() => {
                const length = processedData.length;
                if (length <= 5) return undefined; // 5개 이하면 모든 눈금 표시
                if (length <= 50) return [1, Math.ceil(length / 2), length]; // 50개 이하면 3개
                if (length <= 100) return [1, Math.ceil(length / 3), Math.ceil((length * 2) / 3), length]; // 100개 이하면 4개
                return [1, Math.ceil(length / 4), Math.ceil(length / 2), Math.ceil((length * 3) / 4), length]; // 100개 초과면 5개
              })()}
            />
            <YAxis label={{ value: "여유자금 (냥)", position: "top", angle: 0, offset: 15, dx: 20 }} />
            <Tooltip formatter={(value: number) => `${Math.round(value)}냥`} />
            {/* 평균 라인 추가 */}
            <ReferenceLine
              y={avgCashRatioMean}
              stroke="#4D4B4D"
              strokeDasharray="3 3"
              label={{ value: "", position: "left", offset: 10, dx: 5 }}
            />
            <Line
              type="monotone"
              dataKey="avgCashRatio"
              name="여유자금"
              stroke="#FE4A4E"
              strokeWidth={2}
              dot={processedData.length > 10 ? false : true}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* 커스텀 Legend - 그래프 아래쪽에 위치 */}
        <div className="h-[15%] ml-32 flex gap-4 text-[0.7rem]" style={{ marginLeft: `${legendOffset / 16 + 8}rem` }}>
          <div className="flex gap-2">
            <div className="flex items-center whitespace-nowrap">
              <LegendIcon color="#FE4A4E" />
              <span className="text-[#FE4A4E]">여유자금</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <div className="text-[#4D4B4D]">---</div>
              <span className="text-[#4D4B4D]">평균 여유자금</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
