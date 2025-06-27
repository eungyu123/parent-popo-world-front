import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Cell,
  Label,
} from "recharts";
import { useAuthStore } from "../../../zustand/auth";
import apiClient from "../../../api/api";

// 부모 퀘스트 라벨 매핑
const LABEL_KO: Record<string, string> = {
  HABIT: "정리",
  STUDY: "공부",
  HOUSEHOLD: "집안일",
  ERRAND: "심부름",
  POPO: "포포월드",
  ETC: "기타",
};

// 부모 퀘스트 색상
const LABEL_COLORS: Record<string, string> = {
  HABIT: "#F9A825",
  STUDY: "#4A90E2",
  HOUSEHOLD: "#66BB6A",
  ERRAND: "#FF7043",
  POPO: "#BA68C8",
  ETC: "#90A4AE",
};

// 일일 퀘스트 라벨 및 색상
const DAILY_QUEST_LABELS = [
  "식탁 정리",
  "양치하기",
  "이불 개기",
  "장난감 정리",
  "이야기 나누기",
];
const DAILY_LABEL_COLORS = [
  "#F9A825", // 식탁 정리
  "#4A90E2", // 양치
  "#9575CD", // 이불 개기
  "#4DB6AC", // 장난감 정리
  "#F06292", // 이야기 나누기
];

type CompletionData = {
  label?: string;
  questName?: string;
  completion_rate: number;
};
export const QuestCompletionChart = () => {
  const [data, setData] = useState<CompletionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [questType, setQuestType] = useState<"parent" | "daily">("parent");
  const [period, setPeriod] = useState<"recent7" | "recent30">("recent7");
  const { selectedChildId } = useAuthStore();

  const remToPx = (rem: number) => rem * 16;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(
          `/api/questAnalytics/${questType}/completion-rate`,
          {
            params: {
              childId: selectedChildId,
              period,
            },
          }
        );
        setData(res.data.result || []);
        console.log(res.data);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChildId) {
      fetchData();
    }
  }, [questType, period, selectedChildId]);

  // 줄바꿈 라벨 커스텀 Tick
  const renderCustomizedTick = ({
    x,
    y,
    payload,
  }: {
    x: number;
    y: number;
    payload: { value: string };
  }) => {
    const lines = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y + 11})`}>
        {lines.map((line: string, index: number) => (
          <text
            key={index}
            x={0}
            y={index * 12}
            textAnchor="middle"
            fill="#555"
            fontSize="10"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  const parsedData =
    questType === "daily"
      ? DAILY_QUEST_LABELS.map((label) => {
          const found = data.find((d) => d.questName?.includes(label));
          return {
            quest_name: label,
            completion_rate: found?.completion_rate ?? 0,
            labelKo: label,
          };
        })
      : Object.entries(LABEL_KO).map(([key, labelKo]) => {
          const found = data.find((d) => d.label === key);
          return {
            quest_name: key,
            completion_rate: found?.completion_rate ?? 0,
            labelKo,
          };
        });

  return (
    <section className="py-4 w-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <h4 className="text-lg font-bold text-gray-800">완료율 그래프</h4>
        <div className="flex items-center gap-2 text-sm font-semibold mb-[0.45rem]">
          <div className="flex bg-gray-100 rounded-full px-1 py-[0.2rem]">
            <div className="flex gap-2">
              <button
                onClick={() => setQuestType("daily")}
                className={`px-[0.6rem] py-[0.2rem] rounded-full transition-all ${
                  questType === "daily"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 "
                }`}
              >
                일일
              </button>
              <button
                onClick={() => setQuestType("parent")}
                className={`px-[0.6rem] py-[0.2rem] rounded-full transition-all ${
                  questType === "parent"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 "
                }`}
              >
                부모
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold mb-[0rem]">
            <div className="flex bg-gray-100 rounded-full px-1 py-[0.2rem]">
              <button
                onClick={() => setPeriod("recent30")}
                className={`px-[0.6rem] py-[0.2rem] rounded-full transition-all ${
                  period === "recent30"
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setPeriod("recent7")}
                className={`px-[0.6rem] py-[0.2rem] rounded-full transition-all ${
                  period === "recent7"
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600"
                }`}
              >
                주
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg py-[1rem] border border-gray-100 w-full">
        {!loading && parsedData.length > 0 ? (
          <div className="h-[13.5rem] flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={parsedData}
                barCategoryGap="25%"
                margin={{ top: 30, right: 20, left: -5, bottom: 2 }}
              >
                <CartesianGrid strokeDasharray="5 5" vertical={false} />
                <XAxis
                  dataKey="labelKo"
                  tickLine={false}
                  axisLine={false}
                  tick={renderCustomizedTick}
                  interval={0}
                />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(v) => `${Math.round(v * 100)}%`}
                  tick={{ fontSize: remToPx(0.65), fill: "#888" }}
                  axisLine={false}
                  tickLine={false}
                >
                  <Label
                    value="완료율"
                    position="insideTopLeft"
                    offset={-4}
                    dy={-20}
                    dx={24}
                    style={{
                      textAnchor: "start",
                      fill: "#555",
                      fontSize: "0.7rem",
                    }}
                  />
                </YAxis>
                <Bar dataKey="completion_rate" radius={[5, 5, 0, 0]}>
                  <LabelList
                    dataKey="completion_rate"
                    position="top"
                    formatter={(value: number) => `${Math.round(value * 100)}%`}
                    style={{ fontSize: 12, fontWeight: 600 }}
                  />
                  {parsedData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={
                        questType === "daily"
                          ? DAILY_LABEL_COLORS[idx % DAILY_LABEL_COLORS.length]
                          : LABEL_COLORS[entry.quest_name] || "#ccc"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mt-4 text-center">
            데이터를 불러오는 중입니다...
          </p>
        )}
      </div>
    </section>
  );
};
