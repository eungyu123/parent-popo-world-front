// 구매 판매 비율 그래프 (실제값/평균값 스택 영역)
import { Area, AreaChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { type TradingRatioGraph1Props } from "./types";

// 커스텀 Legend 컴포넌트
function TwoLineLegend() {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <LegendItem color="#78D335" label="고위험" />
        <LegendItem color="#1DB3FB" label="중위험" />
        <LegendItem color="#C57CF0" label="저위험" />
      </div>
    </div>
  );
}
// 범례 아이템 렌더링
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="inline-block w-3 h-3 rounded-xs mr-1" style={{ background: color }} />
      <span>{label}</span>
    </span>
  );
}

export default function TradingRatioGraph1({ TradingRatioData }: { TradingRatioData: TradingRatioGraph1Props[] }) {
  // 더미 데이터 변환: 각 값(0~1)을 %로 변환하여 AreaChart에 사용
  // 실제값(고/중/저 위험)과 평균값(고/중/저 위험) 모두 포함
  const processedData = TradingRatioData.map((item, index) => ({
    gameId: index + 1, // x축 구분용 인덱스(사용 안 해도 됨)
    // 실제값(%)
    highBuyRatio: item.highBuyRatio * 100,
    midBuyRatio: item.midBuyRatio * 100,
    lowBuyRatio: item.lowBuyRatio * 100,
  }));
  return (
    <div className="w-[calc(100%_+_1rem)] h-80 -ml-6 text-sm">
      {/* ResponsiveContainer: 반응형 그래프 컨테이너 */}
      <ResponsiveContainer width="100%" height="100%">
        {/* AreaChart: 영역차트, data에 변환된 processedData 사용 */}
        <AreaChart data={processedData} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
          {/* XAxis: x축, 게임 번호 표시 */}
          <XAxis dataKey="gameId" />
          {/* YAxis: y축, 0~100%로 고정, 단위 표시 */}
          <YAxis
            label={{ value: "비율 (%)", style: { fontSize: "0.75rem" }, position: "top", angle: 0, offset: 15, dx: 20 }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          {/* Tooltip: 마우스 오버 시 값 표시 */}
          <Tooltip formatter={(value: number) => `${Math.round(value)}%`} />
          {/* 실제값 범례 (첫 줄) */}
          <Legend content={<TwoLineLegend />} wrapperStyle={{ marginLeft: "1rem" }} />

          {/* 실제값 스택: stackId="real"로 묶어서 한 영역에 고/중/저 위험이 쌓임 */}
          <Area dataKey="highBuyRatio" name="고위험" stackId="real" fill="#78D335" stroke="#78D335" />
          <Area dataKey="midBuyRatio" name="중위험" stackId="real" fill="#1DB3FB" stroke="#1DB3FB" />
          <Area dataKey="lowBuyRatio" name="저위험" stackId="real" fill="#C57CF0" stroke="#C57CF0" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
