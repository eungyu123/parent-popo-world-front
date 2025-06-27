import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  Tooltip,
  Legend,
} from "recharts";
import { useAuthStore } from "../../../zustand/auth";
import apiClient from "../../../api/api";

const QUEST_LABELS = ["정리", "양치", "숙제", "심부름", "포포월드", "기타"];
const QUEST_COLORS = [
  "#F9A825",
  "#4A90E2",
  "#66BB6A",
  "#FF7043",
  "#BA68C8",
  "#A1887F",
];
const QUEST_X_PARENT = {
  정리: 1,
  양치: 2,
  숙제: 3,
  심부름: 4,
  포포월드: 5,
  기타: 6,
};

const LABEL_KO: Record<string, string> = {
  HABIT: "정리",
  STUDY: "숙제",
  HOUSEHOLD: "양치",
  ERRAND: "심부름",
  POPO: "포포월드",
  ETC: "기타",
};

const DAILY_LABEL_MAP: Record<string, string> = {
  양치하기: "양치",
  "이불 개기": "이불",
  "장난감 정리하기": "장난감 정리",
  "하루 이야기 나누기": "이야기 나누기",
  "식탁 정리": "식탁 정리",
};

const DAILY_QUEST_LABELS = [
  "양치",
  "이불",
  "장난감 정리",
  "이야기 나누기",
  "식탁 정리",
];
const DAILY_LABEL_COLORS = [
  "#4A90E2",
  "#9575CD",
  "#4DB6AC",
  "#F06292",
  "#F9A825",
];
const QUEST_X_DAILY = {
  양치: 1,
  이불: 2,
  "장난감 정리": 3,
  "이야기 나누기": 4,
  "식탁 정리": 5,
};

type CompletionData = {
  label?: string;
  quest_name?: string;
  distribution: { time_bin: string; count: number }[];
};

const mapTimeBinToHour = (bin: string) => parseInt(bin.split("-")[0], 10);

export const QuestCompletionTimeChart = () => {
  const [data, setData] = useState<CompletionData[]>([]);
  const [questType, setQuestType] = useState<"parent" | "daily">("parent");
  const [period, setPeriod] = useState<"recent7" | "recent30">("recent7");
  const { selectedChildId } = useAuthStore();

  useEffect(() => {
    if (!selectedChildId) return;
    const fetch = async () => {
      try {
        const res = await apiClient.get(
          `/api/questAnalytics/${questType}/completion-time`,
          { params: { childId: selectedChildId, period } }
        );
        setData(res.data.result || []);
      } catch (e) {
        console.error("데이터 fetch 실패", e);
      }
    };
    fetch();
  }, [questType, period, selectedChildId]);

  const questLabelList =
    questType === "parent" ? QUEST_LABELS : DAILY_QUEST_LABELS;
  const questColorList =
    questType === "parent" ? QUEST_COLORS : DAILY_LABEL_COLORS;
  const questXMap = questType === "parent" ? QUEST_X_PARENT : QUEST_X_DAILY;

  const chartDataMap: Record<
    string,
    { quest: string; x: number; y: number | null }[]
  > = {};
  questLabelList.forEach((label) => {
    chartDataMap[label] = [
      { quest: label, x: questXMap[label as keyof typeof questXMap], y: null },
    ];
  });

  data.forEach((quest) => {
    const label =
      questType === "parent"
        ? LABEL_KO[quest.label || ""] || quest.label || ""
        : DAILY_LABEL_MAP[quest.quest_name || ""] || quest.quest_name || "";

    const x = questXMap[label as keyof typeof questXMap];
    if (!x) return;

    const points = quest.distribution.flatMap(({ time_bin, count }) => {
      const hour = mapTimeBinToHour(time_bin);
      return Array.from({ length: count }, () => ({
        quest: label,
        x,
        y: hour + Math.random() * 2,
      }));
    });

    if (points.length > 0) {
      chartDataMap[label] = points;
    }
  });

  return (
    <section className="py-4 w-full">
      <div className="flex items-center  mb-3 pl-2">
        <h4 className="text-lg font-bold text-gray-800 mb-2 pl-2 mr-[3.4rem] ">
          완료 시간 분포
        </h4>
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

      <div className="bg-white rounded-3xl shadow-lg p-4 border border-gray-100 w-full mt-4">
        <div className="h-[21rem]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 4" />
              <XAxis
                type="number"
                dataKey="x"
                domain={[0.5, questLabelList.length + 0.5]}
                tick={false}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[0, 24]}
                tickCount={12}
                tickFormatter={(val) => `${val}시`}
                tick={{ fontSize: "0.7rem" }}
              />

              {/* 툴팁 비활성화 */}
              <Tooltip content={() => null} />
              <Legend
                verticalAlign="bottom"
                align="right"
                content={({ payload }) => (
                  <div className="flex justify-center">
                    <div className="flex justify-center w-[60%]  gap-x-[1.8em] gap-y-[0.7rem] text-[0.65rem] font-semibold mt-[0.5rem] ml-[3rem] flex-wrap">
                      {payload?.map((entry, index) => (
                        <div
                          key={`item-${index}`}
                          className="flex items-center gap-[0.15rem]"
                        >
                          <div
                            className="w-[0.5rem] h-[0.5rem] rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span style={{ color: entry.color }}>
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
              {questLabelList.map((label, idx) => (
                <Scatter
                  key={label}
                  name={label}
                  data={chartDataMap[label]}
                  fill={questColorList[idx]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
