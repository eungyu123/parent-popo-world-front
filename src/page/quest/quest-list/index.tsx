import { useEffect, useState } from "react";
import type { Quest } from "../../../features/quest/quest";
import { QuestCard } from "../../../features/quest/QuestCard";
import apiClient from "../../../api/api";
import { ApiError } from "../../../api/api";
import { useAuthStore } from "../../../zustand/auth";
import { ConfirmModal } from "../../../features/quest/ConfirmModal";

const questStateMap: Record<string, Quest["state"]> = {
  PENDING_ACCEPT: "수락 전",
  IN_PROGRESS: "진행 중",
  PENDING_APPROVAL: "확인 요청",
  APPROVED: "지급 대기",
  COMPLETED: "지급 완료",
  EXPIRED: "기간 만료",
};

export const QuestListPage = () => {
  const [questData, setQuestData] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questType, setQuestType] = useState<"parent" | "daily">("parent");
  const [selectedState, setSelectedState] = useState<string>("확인 요청");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    questId: string;
    childId: string;
    state: Quest["state"];
  } | null>(null);
  const { selectedChildId } = useAuthStore();

  // 퀘스트 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/api/quest/parent?childId=${selectedChildId}&type=${questType}`
        );
        const data = await response.data;
        const mapped = data.quests.map((item: Quest) => ({
          ...item,
          state: questStateMap[item.state],
        }));
        const sorted = sortQuests(mapped);
        setQuestData(sorted);
      } catch (err) {
        setError("퀘스트 불러오기 실패: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questType, selectedChildId]);

  // 퀘스트 상태 변경 클릭
  const handleChangeState = (
    questId: string,
    childId: string,
    state: Quest["state"]
  ) => {
    if (state !== "확인 요청") return;
    // 수락하기, 다 했어요 눌렀을 경우 모달창
    setIsModalOpen(true);
    setPendingChange({ questId, childId, state });
  };

  // 상태 변경하기 api 요청
  const proceedChangeState = async (
    questId: string,
    childId: string,
    state: Quest["state"]
  ) => {
    if (state !== "확인 요청") return;

    const body = { questId, childId, state: "APPROVED" };
    console.log("상태 변경 요청 body:", body);

    try {
      await apiClient.post("/api/quest/state", body);

      setQuestData((prev) =>
        prev.map((quest) =>
          quest.quest_id === questId ? { ...quest, state: "지급 대기" } : quest
        )
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류 발생");
      }
    } finally {
      setLoading(false);
    }
  };

  // 모달창에서 확인 버튼 클릭
  const handleModalConfirm = () => {
    if (pendingChange) {
      proceedChangeState(
        pendingChange.questId,
        pendingChange.childId,
        pendingChange.state
      );
    }
    setPendingChange(null);
    setIsModalOpen(false);
  };

  const sortQuests = (quests: Quest[]) => {
    const stateOrder: Quest["state"][] = [
      "확인 요청",
      "진행 중",
      "수락 전",
      "지급 대기",
      "지급 완료",
      "기간 만료",
    ];

    return quests.sort((a, b) => {
      const stateA = stateOrder.indexOf(a.state);
      const stateB = stateOrder.indexOf(b.state);
      if (stateA !== stateB) return stateA - stateB;
      return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    });
  };

  const stateFilterList = [
    { label: "수락 전", value: "수락 전", color: "bg-red-300" },
    { label: "진행 중", value: "진행 중", color: "bg-yellow-300" },
    { label: "확인 요청", value: "확인 요청", color: "bg-blue-300" },
    { label: "지급 대기", value: "지급 대기", color: "bg-green-300" },
    { label: "지급 완료", value: "지급 완료", color: "bg-purple-300" },
    { label: "기간 만료", value: "기간 만료", color: "bg-orange-300" },
  ];

  return (
    <>
      {/* 퀘스트 유형 토글 버튼 */}
      <div className="flex gap-[1rem] justify-center items-center mt-4">
        {[
          { label: "부모 퀘스트", value: "parent" },
          { label: "일일 퀘스트", value: "daily" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setQuestType(value as "parent" | "daily")}
            className={`px-[2rem] py-[0.35rem] font-semibold rounded-full text-[0.9rem] transition-all duration-200
              ${
                questType === value
                  ? "bg-[#ff8861] text-white shadow"
                  : "bg-[#ffe3d6] text-[#ff8861] hover:bg-[#ffd0b9]"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 퀘스트 리스트 박스 (스크롤은 여기서 분리) */}
      <div className="max-w-xl mx-auto mt-4 px-4 py-4 rounded-3xl border border-[#57320822] shadow-md bg-white">
        {/* 상태 필터: 스크롤 영역 밖 */}
        <div className="overflow-x-auto scrollbar-hidden mb-4">
          <div className="flex gap-2 min-w-max whitespace-nowrap pr-4">
            {stateFilterList.map(({ label, value, color }) => (
              <button
                key={value}
                onClick={() =>
                  setSelectedState(value === selectedState ? "null" : value)
                }
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium transition
                  ${
                    selectedState === value
                      ? `${color} text-white`
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 스크롤 되는 부분: 퀘스트 카드 리스트만 */}
        <div className="h-[29rem] overflow-y-scroll scrollbar-hidden space-y-3">
          {!loading &&
            !error &&
            (() => {
              const filteredQuests = questData.filter(
                (quest) =>
                  selectedState === "null" || quest.state === selectedState
              );

              if (filteredQuests.length === 0) {
                return (
                  <div className="flex justify-center items-center text-gray-400 text-sm h-full bg-[#b4b4b424] rounded-xl">
                    해당 상태의 퀘스트가 없습니다
                  </div>
                );
              }

              return filteredQuests.map((quest) => (
                <QuestCard
                  key={quest.quest_id}
                  quest={quest}
                  onChangeState={() =>
                    handleChangeState(
                      quest.quest_id,
                      quest.child_id,
                      quest.state
                    )
                  }
                />
              ));
            })()}

          {loading && (
            <div className="text-center text-gray-500 mt-10">로딩 중...</div>
          )}
          {error && (
            <div className="text-center text-red-500 mt-10">{error}</div>
          )}
        </div>
      </div>

      {/* 모달 */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </>
  );
};
