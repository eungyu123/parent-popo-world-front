import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface WeeklySummaryReportProps {
  data: CategoryData[];
}

export const WeeklySummaryReport = ({ data }: WeeklySummaryReportProps) => {
  return (
    <div className="bg-white rounded-lg pt-6 pb-4 shadow-sm mb-6 border border-gray-100">
      <h3 className="px-6 text-lg font-semibold text-gray-800 mb-7">카테고리별 소비 비중</h3>

      <div className="w-full h-72 text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={1}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${(value || 0).toLocaleString()}원`, "소비액"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
