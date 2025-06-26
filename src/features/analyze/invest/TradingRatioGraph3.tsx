// 구매 판매 비율 그래프 (실제값/평균값 스택 막대)
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { type TradingRatioGraph3Props } from "./types";

// 커스텀 Legend 컴포넌트
function TwoLineLegend() {
  return (
    <div style={{ textAlign: "center", marginBottom: 0 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <LegendItem color="#4D4B4D" label="고위험" />
        <LegendItem color="#FE4A4E" label="중위험" />
        <LegendItem color="#C57CF0" label="저위험" />
      </div>
    </div>
  );
}
// 범례 아이템 렌더링
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-0.5">
      <span className="inline-block w-3 h-3 rounded-xs mr-0.5" style={{ background: color }} />
      <span>{label}</span>
    </span>
  );
}

export default function TradingRatioGraph3({ TradingRatioData }: { TradingRatioData: TradingRatioGraph3Props[] }) {
  const processedData = [
    {
      xLabel: "나의 투자 비율",
      my_highRatio: TradingRatioData[0].MyhighRatioMean * 100,
      my_midRatio: TradingRatioData[0].MymidRatioMean * 100,
      my_lowRatio: TradingRatioData[0].MylowRatioMean * 100,
    },
    {
      xLabel: "또래 평균",
      my_highRatio: TradingRatioData[0].highRatio_age * 100,
      my_midRatio: TradingRatioData[0].midRatio_age * 100,
      my_lowRatio: TradingRatioData[0].lowRatio_age * 100,
    },
  ];

  return (
    <div className="w-[calc(100%_+_1rem)] h-80 -ml-6 text-sm">
      {/* ResponsiveContainer: 반응형 그래프 컨테이너 */}
      <ResponsiveContainer width="100%" height="100%">
        {/* BarChart: 막대그래프, data에 변환된 processedData 사용 */}
        <BarChart data={processedData} margin={{ top: 40, right: 0, left: 0, bottom: 0 }} barCategoryGap="0%">
          {/* XAxis: x축, 각 데이터 포인트에 대한 텍스트 표시 */}
          <XAxis
            dataKey="xLabel"
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="12">
                  {payload.value}
                </text>
              </g>
            )}
          />
          {/* YAxis: y축, 0~100%로 고정, 단위 표시 */}
          <YAxis
            label={{ value: "비율 (%)", style: { fontSize: "0.75rem" }, position: "top", angle: 0, offset: 15, dx: 20 }}
            domain={[0, 100]}
          />
          {/* Tooltip: 마우스 오버 시 값 표시 */}
          <Tooltip formatter={(value: number) => `${Math.round(value)}%`} />
          {/* 실제값 범례 (첫 줄) */}
          <Legend content={<TwoLineLegend />} wrapperStyle={{ marginLeft: "1rem" }} />

          {/* 실제값 스택: stackId="real"로 묶어서 한 막대에 고/중/저 위험이 쌓임 */}
          <Bar dataKey="my_highRatio" barSize={60} name="고위험" stackId="real" fill="#4D4B4D" radius={[0, 0, 0, 0]} />
          <Bar dataKey="my_midRatio" barSize={60} name="중위험" stackId="real" fill="#FE4A4E" radius={[0, 0, 0, 0]} />
          <Bar dataKey="my_lowRatio" barSize={60} name="저위험" stackId="real" fill="#C57CF0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
