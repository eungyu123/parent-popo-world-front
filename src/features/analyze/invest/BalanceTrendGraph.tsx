import { LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line } from "recharts";
import { investTypes } from "../../../page/AnalyzeCenter/invest/index";

// DummyData 배열에 추가
const BalanceTrendDummyData = [
  { gameId: "1", balance: 1000 },
  { gameId: "2", balance: 120 },
  { gameId: "3", balance: 300 },
  { gameId: "4", balance: 130 },
  { gameId: "5", balance: 600 },
  { gameId: "6", balance: 140 },
  { gameId: "7", balance: 700 },
  { gameId: "8", balance: 150 },
  { gameId: "9", balance: 200 },
  { gameId: "10", balance: 160 },
];

export default function BalanceTrendGraph({ selectedAnalyzeType }: { selectedAnalyzeType: string }) {
  return (
    <div className="w-[calc(100%_+_1rem)] h-80 -ml-4 text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={BalanceTrendDummyData} margin={{ top: 40, right: 10, left: 0, bottom: 0 }}>
          <XAxis dataKey="gameId" />
          <YAxis label={{ value: "여유자금 (냥)", position: "top", angle: 0, offset: 15, dx: 20 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            name="여유자금"
            stroke={investTypes[selectedAnalyzeType].color}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
