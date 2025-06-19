import type { Quest } from "./quest";
import React from "react";

interface QuestCardProps {
  quest: Quest;
  onChangeState: () => void;
}

const formatDateToKorean = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

export const QuestCard = React.memo(
  ({ quest, onChangeState }: QuestCardProps) => {
    const statusColor = {
      "수락 전": "bg-red-300",
      "진행 중": "bg-yellow-300",
      "확인 요청": "bg-blue-300",
      "지급 대기": "bg-green-300",
      "지급 완료": "bg-purple-300",
      "기간 만료": "bg-orange-300",
    };

    const labelText: Record<string, string> = {
      HABIT: "생활습관",
      STUDY: "학습",
      HOUSEHOLD: "집안일",
      ERRAND: "심부름",
      POPO: "포포월드 기능",
      ETC: "기타",
    };

    const labelColor: Record<string, string> = {
      HABIT: "bg-[#fde68a] text-[#92400e]", // 연노랑
      STUDY: "bg-[#bfdbfe] text-[#1e3a8a]", // 연하늘
      HOUSEHOLD: "bg-[#fcd5ce] text-[#7f1d1d]", // 살구
      ERRAND: "bg-[#e9d5ff] text-[#6b21a8]", // 연보라
      POPO: "bg-[#bbf7d0] text-[#065f46]", // 연두
      ETC: "bg-[#e5e7eb] text-[#374151]", // 회색
    };

    return (
      <div className="flex flex-col items-start justify-center  mb-[1rem]  rounded-xl   shadow-sm h-auto w-full py-[0.7rem] px-[1rem] border-[0.005rem]  border-[#65585136]">
        <div
          className={`text-[0.65rem] font-semibold px-[0.8rem] py-[0.15rem] rounded-full mb-[0.7rem]
            ${labelColor[quest.label] ?? "bg-gray-200 text-gray-700"}`}
        >
          {labelText[quest.label] ?? "기타"}
        </div>
        <div className="flex ">
          <img
            src={
              quest.imageUrl ??
              "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749099020/Rectangle_411_2_kfgmot.webp"
            }
            alt="퀘스트 이미지"
            className="w-[3rem] h-[3rem] rounded-lg object-contain  border-white shadow"
          />
          <div className="flex flex-col gap-[0.1rem] w-[11rem] ml-[1rem] mr-[1rem]  ">
            <span className="font-bold text-[0.73rem]">{quest.name}</span>
            <span className="text-[0.68rem] text-gray-600">
              {quest.description}
            </span>
            <span className="text-[0.63rem] text-gray-500">
              기한: {formatDateToKorean(quest.end_date)}
            </span>
          </div>
          <div className="flex flex-col justify-start items-center min-w-fit">
            <div
              className={`text-white cursor-pointer w-full text-[0.73rem] px-[0.375rem] py-[0.2rem] rounded text-center ${
                statusColor[quest.state]
              }`}
              onClick={onChangeState}
            >
              {quest.state}
            </div>
            <div className="text-[0.7rem] mt-[0.3rem] flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1748951657/common_coin_oii3sa.webp"
                alt="코인"
                className="h-[0.75rem]"
              />
              <div className="mt-[0.1rem] ml-[0.15rem]">{quest.reward}냥</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
