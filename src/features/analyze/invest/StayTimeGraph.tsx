// 체류시간 그래프

import { Legend, XAxis, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import LegendIcon from "../../../components/icons/Legend";
import { useRef, useState, useEffect } from "react";

export interface StayTimeGraphProps {
  avgStayTime: number;
  avgStayTimeMean: number;
  startedAt: string;
  tagAvgStayTime: number;
  tagAvgStayTimeMean: number;
  userId: string;
}

export default function StayTimeGraph({ StayTimeData }: { StayTimeData: StayTimeGraphProps[] }) {
  // 평균 계산
  console.log("StayTimeData", StayTimeData);
  const avgStayTimeMean = StayTimeData.length > 0 ? StayTimeData[0].avgStayTimeMean : 0;
  const tagAvgStayTimeMean = StayTimeData.length > 0 ? StayTimeData[0].tagAvgStayTimeMean : 0;

  // 게임 번호를 추가한 데이터 생성
  const dataWithGameNumber = StayTimeData.map((item, index) => ({
    ...item,
    gameNumber: index + 1,
  }));

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
      console.log(scrollContainerRef.current);
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        console.log("scrollLeft", scrollLeft);
        setLegendOffset(scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      console.log("container", container);
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className=" h-[24rem] -ml-9 text-xs overflow-x-auto scrollbar-hidden"
      style={{ width: getContainerWidth(dataWithGameNumber.length) }}
      ref={scrollContainerRef}
    >
      <div className={`relative`} style={{ width: getWidthClass(dataWithGameNumber.length), height: "100%" }}>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={dataWithGameNumber} margin={{ top: 40, right: 15, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="gameNumber"
              label={{ value: "게임 수", position: "right", offset: -30, dy: 8, dx: 2 }}
              ticks={(() => {
                const length = dataWithGameNumber.length;
                if (length <= 5) return undefined; // 10개 이하면 모든 눈금 표시
                if (length <= 50) return [1, Math.ceil(length / 2), length]; // 50개 이하면 3개
                if (length <= 100) return [1, Math.ceil(length / 3), Math.ceil((length * 2) / 3), length]; // 100개 이하면 4개
                return [1, Math.ceil(length / 4), Math.ceil(length / 2), Math.ceil((length * 3) / 4), length]; // 100개 초과면 5개
              })()}
              tick={{ fontSize: 10 }}
            />
            <YAxis label={{ value: "단위 (초)", position: "top", angle: 0, offset: 15, dx: 20 }} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}초`} />
            {/* 평균 라인 추가 */}
            <ReferenceLine
              y={avgStayTimeMean}
              stroke="#1DB3FB"
              strokeDasharray="3 3"
              label={{ value: "", position: "left", offset: 10, dx: 5 }}
            />
            <ReferenceLine
              y={tagAvgStayTimeMean}
              stroke="#78D335"
              strokeDasharray="3 3"
              label={{ value: "", position: "left", offset: 10, dx: 5 }}
            />
            <Line
              type="monotone"
              dataKey="avgStayTime"
              name="턴 체류시간"
              stroke="#1DB3FB"
              strokeWidth={2}
              dot={dataWithGameNumber.length > 10 ? false : true}
            />
            <Line
              type="monotone"
              dataKey="tagAvgStayTime"
              name="태그 체류시간"
              stroke="#78D335"
              strokeWidth={2}
              dot={dataWithGameNumber.length > 10 ? false : true}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* 커스텀 Legend - 그래프 아래쪽에 위치 */}
        <div
          className="h-[15%] ml-32 flex flex-col gap-2 text-[0.7rem]"
          style={{ marginLeft: `${legendOffset / 16 + 8}rem` }}
        >
          <div className="flex gap-2">
            <div className="flex items-center whitespace-nowrap">
              <LegendIcon color="#1DB3FB" />
              <span className="text-[#1DB3FB]">턴 체류시간 </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <LegendIcon color="#78D335" />
              <span className="text-[#78D335]">태그 체류시간</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <div className="text-[#1DB3FB]">---</div>
              <span className="text-[#1DB3FB]">평균 턴 체류시간</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <div className="text-[#78D335]">---</div>
              <span className="text-[#78D335]">평균 태그 체류시간</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
