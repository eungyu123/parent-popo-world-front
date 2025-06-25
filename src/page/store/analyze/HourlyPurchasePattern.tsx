import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HourlyData {
  hour: string;
  purchases: number;
}

interface HourlyPurchasePatternProps {
  data: HourlyData[];
}

export const HourlyPurchasePattern = ({ data }: HourlyPurchasePatternProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md py-6 mb-6 border border-gray-100">
      <h3 className="px-6 text-lg font-semibold text-gray-900 mb-4">시간대별 구매 패턴</h3>
      <div className="w-full h-72 -ml-7 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value || 0}건`, "구매 횟수"]} />
            <Line type="monotone" dataKey="purchases" stroke="#4ecdc4" strokeWidth={3} dot={{ fill: "#4ecdc4" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
