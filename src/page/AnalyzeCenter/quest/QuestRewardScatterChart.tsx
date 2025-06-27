import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  Legend,
  Label,
} from "recharts";
import apiClient from "../../../api/api";
import { useAuthStore } from "../../../zustand/auth";

const LABEL_KO: Record<string, string> = {
  HABIT: "정리",
  STUDY: "공부",
  HOUSEHOLD: "집안일",
  ERRAND: "심부름",
  POPO: "포포월드",
  ETC: "기타",
};

const QUEST_COLORS: Record<string, string> = {
  정리: "#F9A825",
  공부: "#4A90E2",
  집안일: "#66BB6A",
  심부름: "#FF7043",
  포포월드: "#BA68C8",
  기타: "#A1887F",
};

interface RawQuestData {
  label: string;
  reward: number;
  completion_rate: number;
}

interface RegressionPoint {
  reward: number;
  completion_rate: number;
}

export const QuestRewardScatterChart = () => {
  const [data, setData] = useState<RawQuestData[]>([]);
  const [regression, setRegression] = useState<RegressionPoint[]>([]);
  const [period, setPeriod] = useState<"weekly" | "all">("weekly");
  const { selectedChildId } = useAuthStore();

  const remToPx = (rem: number) => rem * 16;

  useEffect(() => {
    if (!selectedChildId) return;
    const fetch = async () => {
      try {
        const res = await apiClient.get(
          "/api/questAnalytics/parent/completion-reward",
          {
            params: { childId: selectedChildId, period },
          }
        );
        console.log(res.data.regression_line);
        setData(res.data.result || []);
        setRegression(res.data.regression_line || []);
      } catch (e) {
        console.error("보상-완료율 데이터 fetch 실패", e);
      }
    };
    fetch();
  }, [selectedChildId, period]);

  const chartData = data.map((item) => ({
    ...item,
    label: LABEL_KO[item.label] || item.label,
  }));

  const rewards = chartData.map((d) => d.reward);
  const minReward = Math.min(...rewards);
  const maxReward = Math.max(...rewards);

  const regressionLine = regression.map((point) => ({
    ...point,
  }));

  const labelList = Object.values(LABEL_KO);

  return (
    <section className="py-4 w-full">
      <div className="flex items-center mb-3 pl-2">
        <h4 className="text-lg font-bold text-gray-800 mb-2 pr-4 mr-[2.7rem]">
          보상과 완료율 분포 (부모)
        </h4>
        <div className="flex items-center gap-2 text-sm font-semibold mb-[0.45rem]">
          <div className="flex bg-gray-100 rounded-full px-1 py-[0.2rem]">
            <button
              onClick={() => setPeriod("all")}
              className={`px-[0.8rem] py-[0.2rem] rounded-full transition-all ${
                period === "all"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setPeriod("weekly")}
              className={`px-[1rem] py-[0.2rem] rounded-full transition-all ${
                period === "weekly"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              주
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-4 border border-gray-100 w-full mt-4">
        <div className="h-[21rem]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 40, right: 13, left: -20, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 4" />
              <XAxis
                type="number"
                dataKey="reward"
                domain={[minReward - 10, maxReward + 10]}
                tick={{ fontSize: remToPx(0.7), fill: "#888" }}
              >
                <Label
                  value="보상"
                  position="insideBottomRight"
                  offset={0}
                  dy={3}
                  dx={-10}
                  style={{
                    textAnchor: "start",
                    fill: "#555",
                    fontSize: "0.7rem",
                  }}
                />
              </XAxis>

              <YAxis
                type="number"
                dataKey="completion_rate"
                domain={[0, 1.1]}
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
                tick={{ fontSize: remToPx(0.65), fill: "#888" }}
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

              {labelList.map((label) => (
                <Scatter
                  key={label}
                  name={label}
                  data={chartData.filter((q) => q.label === label)}
                  fill={QUEST_COLORS[label]}
                />
              ))}

              {/* 추세선 Scatter로 그리기 */}
              <Scatter
                data={regressionLine}
                line={{ stroke: "#888", strokeWidth: 1 }}
                shape={() => <></>}
                isAnimationActive={false}
              />
              <Legend
                verticalAlign="bottom"
                align="right"
                wrapperStyle={{ paddingTop: 12 }}
                content={() => (
                  <div className="flex justify-center">
                    <div className="flex justify-center w-[60%] gap-x-[1.8em] gap-y-[0.7rem] text-[0.65rem] font-semibold mt-[0.5rem] ml-[3rem] flex-wrap">
                      {labelList.map((label, index) => (
                        <div
                          key={`item-${index}`}
                          className="flex items-center gap-[0.15rem]"
                        >
                          <div
                            className="w-[0.5rem] h-[0.5rem] rounded-full"
                            style={{ backgroundColor: QUEST_COLORS[label] }}
                          />
                          <span style={{ color: QUEST_COLORS[label] }}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
