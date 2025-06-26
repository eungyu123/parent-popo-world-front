import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface WeeklyTrendData {
  day: string;
  간식: number;
  오락: number;
  장난감: number;
  교육: number;
  기타: number;
}

const colors = {
  간식: "#FF6B6B",
  오락: "#4ECDC4",
  장난감: "#45B7D1",
  교육: "#96CEB4",
  기타: "#FFEAA7",
};

interface CustomTopRoundedBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  payload: { [key: string]: number };
}

const categories: string[] = ["간식", "오락", "장난감", "교육", "기타"]; // 이 순서대로 stack됨

const CustomTopRoundedBar = (props: CustomTopRoundedBarProps, category: string) => {
  const { x, y, width, height, fill, payload } = props;

  const isTopStack = (() => {
    for (let i = categories.length - 1; i >= 0; i--) {
      if (payload[categories[i]] > 0) {
        return categories[i] === category;
      }
    }
    return false;
  })();

  if (!isTopStack) {
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  }

  const radius = 4;

  // path로 위쪽만 둥근 사각형 만들기
  const path = `
      M${x},${y + radius}
      A${radius},${radius} 0 0 1 ${x + radius},${y}
      H${x + width - radius}
      A${radius},${radius} 0 0 1 ${x + width},${y + radius}
      V${y + height}
      H${x}
      Z
    `;

  return <path d={path} fill={fill} />;
};

interface WeeklyCategoryTrendProps {
  data: WeeklyTrendData[];
}

export const WeeklyCategoryTrend = ({ data }: WeeklyCategoryTrendProps) => {
  return (
    <div className=" rounded-lg px-1 py-6 shadow-sm mb-6 border border-gray-100">
      <h3 className="px-4 text-lg font-semibold text-gray-800 mb-6">주간 카테고리별 소비 추이</h3>

      <div className="w-full h-72 -ml-5 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 4, left: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis
              label={{
                value: "소비 금액 (원)",
                position: "top",
                angle: 0,
                offset: 15,
                dx: 20,
              }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()}원`, ""]}
              labelFormatter={(label) => `${label}요일`}
            />
            <Legend
              wrapperStyle={{
                display: "flex ",
                justifyContent: "center",
                marginTop: 10,
                marginLeft: 45,
              }}
              payload={[
                { value: "간식", type: "rect", color: colors.간식 },
                { value: "오락", type: "rect", color: colors.오락 },
                { value: "장난감", type: "rect", color: colors.장난감 },
                { value: "교육", type: "rect", color: colors.교육 },
                { value: "기타", type: "rect", color: colors.기타 },
              ]}
            />
            {categories.map((category) => (
              <Bar
                key={category}
                dataKey={category}
                name={category}
                stackId="a"
                fill={colors[category as keyof typeof colors]}
                shape={(props: unknown) => CustomTopRoundedBar(props as CustomTopRoundedBarProps, category)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
