import { useEffect, useState } from "react";
import apiClient from "../../../api/api";
import { useAuthStore } from "../../../zustand/auth";

interface ApprovalTimeData {
  avg_minutes: number;
  formatted: string;
}

export const QuestApprovalTime = () => {
  const { selectedChildId } = useAuthStore();
  const [period, setPeriod] = useState<"weekly" | "all">("weekly");
  const [questType, setQuestType] = useState<"daily" | "parent">("parent");
  const [data, setData] = useState<ApprovalTimeData | null>(null);

  useEffect(() => {
    if (!selectedChildId) return;

    const fetch = async () => {
      try {
        const res = await apiClient.get(
          "/api/questAnalytics/parent/approval-time",
          {
            params: {
              childId: selectedChildId,
              period,
              questType,
            },
          }
        );
        console.log(res.data);
        setData(res.data.result);
      } catch (err) {
        console.error("승인 소요시간 가져오기 실패", err);
      }
    };

    fetch();
  }, [selectedChildId, period, questType]);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes * 60) % 60);
    return `${hrs}시간 ${mins}분 ${secs}초`;
  };

  return (
    <section className="py-4 w-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <h4 className="text-lg font-bold text-gray-800">
          부모의 승인 소요시간
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
                onClick={() => setPeriod("all")}
                className={`px-[0.6rem] py-[0.2rem] rounded-full transition-all ${
                  period === "all"
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setPeriod("weekly")}
                className={`px-[0.6rem] py-[0.2rem] rounded-full transition-all ${
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
      </div>

      {data ? (
        <div className="flex justify-center items-center gap-4 mt-4 bg-white rounded-3xl shadow-lg py-[1rem] text-gray-800 text-lg font-semibold">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-[0.5rem]">
              평균 소요시간
            </div>
            <div className="bg-[#fef3c7] border border-[#facc15] rounded-xl px-[3rem] py-2 text-base mb-2 shadow-inner">
              {formatTime(data.avg_minutes)}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-sm text-gray-400 py-6">
          데이터를 불러오는 중입니다...
        </div>
      )}
    </section>
  );
};
