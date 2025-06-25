// 체류시간 그래프

import { Legend, XAxis, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import graph1AllDummy from "./graph1_all_dummy";

// CSV 파싱 및 변환 함수
function parseTimeToSeconds(timeStr: string): number {
  // 예: '0 days 00:00:10.250000'
  const match = timeStr.match(/(\d+) days (\d+):(\d+):(\d+\.?\d*)/);
  if (!match) return 0;
  const days = parseInt(match[1], 10);
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3], 10);
  const seconds = parseFloat(match[4]);
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

const StayTime = (graph1AllDummy as any[]).map((row) => ({
  startedAt: row.startedAt,
  avgStayTime: Number(row.avgStayTime),
  tagAvgStayTime: parseTimeToSeconds(row.tagAvgStayTime),
}));

export default function StayTimeGraph() {
  // 평균 계산
  const avgStayTimeMean = StayTime.length
    ? StayTime.reduce((acc, curr) => acc + curr.avgStayTime, 0) / StayTime.length
    : 0;
  return (
    <div className="w-[calc(100%_+_1rem)] h-80 -ml-4 text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={StayTime} margin={{ top: 40, right: 10, left: 0, bottom: 0 }}>
          <XAxis dataKey="startedAt" />
          <YAxis label={{ value: "단위 (초)", position: "top", angle: 0, offset: 15, dx: 20 }} />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}초`} />
          <Legend />
          {/* 평균 라인 추가 */}
          <ReferenceLine
            y={avgStayTimeMean}
            stroke="#666"
            strokeDasharray="3 3"
            label={{ value: "평균", position: "left", offset: 10, dx: 5 }}
          />
          <Line type="monotone" dataKey="avgStayTime" name="평균 턴 체류시간" stroke="#1DB3FB" strokeWidth={2} />
          <Line type="monotone" dataKey="tagAvgStayTime" name="평균 태그 체류시간" stroke="#78D335" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
