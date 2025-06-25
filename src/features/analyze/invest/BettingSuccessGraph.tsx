// 배팅 성공률 그래프
import { LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line } from "recharts";

// 더미 데이터
const BettingSuccessDummyData = [
  { gameId: "1", buySuccess: 65, sellSuccess: 45 },
  { gameId: "2", buySuccess: 70, sellSuccess: 57 },
  { gameId: "3", buySuccess: 85, sellSuccess: 65 },
  { gameId: "4", buySuccess: 70, sellSuccess: 50 },
  { gameId: "5", buySuccess: 75, sellSuccess: 64 },
  { gameId: "6", buySuccess: 90, sellSuccess: 70 },
  { gameId: "7", buySuccess: 75, sellSuccess: 58 },
  { gameId: "8", buySuccess: 85, sellSuccess: 65 },
  { gameId: "9", buySuccess: 95, sellSuccess: 75 },
  { gameId: "10", buySuccess: 80, sellSuccess: 60 },
];

export default function BettingSuccessGraph() {
  return (
    <div className="w-[calc(100%_+_1rem)] h-80 -ml-4 text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={BettingSuccessDummyData} margin={{ top: 40, right: 10, left: 0, bottom: 0 }}>
          <XAxis dataKey="gameId" />
          <YAxis label={{ value: "성공률 (%)", position: "top", angle: 0, offset: 15, dx: 20 }} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="buySuccess" name="구매 배팅" stroke="#78D335" strokeWidth={2} dot={{ r: 4 }} />
          <Line
            type="monotone"
            dataKey="sellSuccess"
            name="판매 배팅"
            stroke="#1DB3FB"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
