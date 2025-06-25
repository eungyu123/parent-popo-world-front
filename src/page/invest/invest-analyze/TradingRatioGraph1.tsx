// 구매 판매 비율 그래프 (실제값/평균값 스택 막대)
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import graph2_1AllDummy from "./graph2_1_all_dummy";

// 더미 데이터 변환: 각 값(0~1)을 %로 변환하여 BarChart에 사용
// 실제값(고/중/저 위험)과 평균값(고/중/저 위험) 모두 포함
const processedData = graph2_1AllDummy.map((item, index) => ({
  gameId: index + 1, // x축 구분용 인덱스(사용 안 해도 됨)
  // 실제값(%)
  highBuyRatio: item.highBuyRatio * 100,
  midBuyRatio: item.midBuyRatio * 100,
  lowBuyRatio: item.lowBuyRatio * 100,
  // 평균값(%)
  highBuyRatioMean: item.highBuyRatioMean * 100,
  midBuyRatioMean: item.midBuyRatioMean * 100,
  lowBuyRatioMean: item.lowBuyRatioMean * 100,
}));

// 커스텀 Legend 컴포넌트
function TwoLineLegend() {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <LegendItem color="#78D335" label="고위험" />
        <LegendItem color="#1DB3FB" label="중위험" />
        <LegendItem color="#C57CF0" label="저위험" />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 4 }}>
        <LegendItem color="#B2D335" label="평균 고위험" />
        <LegendItem color="#7DD3FC" label="평균 중위험" />
        <LegendItem color="#E0B3F0" label="평균 저위험" />
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

export default function TradingRatioGraph1() {
  return (
    <div className="w-[calc(100%_+_1rem)] h-80 -ml-6 text-sm">
      {/* ResponsiveContainer: 반응형 그래프 컨테이너 */}
      <ResponsiveContainer width="100%" height="100%">
        {/* BarChart: 막대그래프, data에 변환된 processedData 사용 */}
        <BarChart data={processedData} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
          {/* XAxis: x축, 날짜(시작 시각) 표시 */}
          <XAxis dataKey="gameId" />
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
          <Bar dataKey="highBuyRatio" name="고위험" stackId="real" fill="#78D335" radius={[0, 0, 0, 0]} />
          <Bar dataKey="midBuyRatio" name="중위험" stackId="real" fill="#1DB3FB" radius={[0, 0, 0, 0]} />
          <Bar dataKey="lowBuyRatio" name="저위험" stackId="real" fill="#C57CF0" radius={[4, 4, 0, 0]} />
          {/* 평균값 스택: stackId="mean"로 묶어서 한 막대에 고/중/저 위험(평균)이 쌓임 */}
          <Bar dataKey="highBuyRatioMean" name="고위험(평균)" stackId="mean" fill="#B2D335" radius={[0, 0, 0, 0]} />
          <Bar dataKey="midBuyRatioMean" name="중위험(평균)" stackId="mean" fill="#7DD3FC" radius={[0, 0, 0, 0]} />
          <Bar dataKey="lowBuyRatioMean" name="저위험(평균)" stackId="mean" fill="#E0B3F0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
