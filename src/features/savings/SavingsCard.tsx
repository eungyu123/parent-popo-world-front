import React from "react";
import DonutChart from "./DonutChart";

type Status = "ACTIVE" | "COMPLETED" | "EXPIRED";

interface SavingsCardProps {
  savingsInfo: {
    current: number;
    goal: number;
    start: string;
    end: string;
    status: Status;
    history: Array<{
      date: string;
      name: string;
      amount: number;
      total: number;
    }>;
  };
  onShowHistory: () => void;
}

const getStatusStyle = (status: Status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-blue-500 text-white";
    case "COMPLETED":
      return "bg-green-500 text-white";
    case "EXPIRED":
      return "bg-red-500 text-white";
  }
};

const getStatusText = (status: Status) => {
  switch (status) {
    case "ACTIVE":
      return "진행중";
    case "COMPLETED":
      return "목표 달성 완료";
    case "EXPIRED":
      return "기간 만료";
  }
};

const SavingsCard: React.FC<SavingsCardProps> = ({
  savingsInfo,
  onShowHistory,
}) => {
  // 목표 달성 보상금 계산 (목표액의 10%)
  const reward = Math.floor(savingsInfo.goal * 0.1);

  return (
    <div className="w-[20rem] rounded-2xl shadow-md border-gray-200 border-2 mt-[-2rem] relative">
      <div className="bg-blue-400 h-[3rem] w-[19.8rem] text-[1.2rem] flex items-center justify-center text-white rounded-t-xl">
        저축 통장
      </div>
      <div className="flex justify-end mt-2 mr-2 absolute top-14 right-2">
        <div
          className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
            savingsInfo.status
          )}`}
        >
          {getStatusText(savingsInfo.status)}
        </div>
      </div>
      <div className="bg-white p-4 pb-1 ml-2">
        <div>현재 저축 금액</div>
        <div className="bg-gray-200 w-fit px-2 rounded-md mt-1">
          {savingsInfo.current}냥
        </div>
      </div>
      <div className="bg-white p-4 pb-1 ml-2">
        <div>목표 저축 금액</div>
        <div className="bg-gray-200 w-fit px-2 rounded-md mt-1">
          {savingsInfo.goal}냥
        </div>
      </div>
      <div className="bg-white p-4 pb-1 ml-2">
        <div>시작일 ~ 종료일</div>
        <div className="bg-gray-200 w-fit px-2 rounded-md mt-1">
          {savingsInfo.start} ~ {savingsInfo.end}
        </div>
      </div>
      <div className="bg-white p-4 pb-1 ml-2">
        <div>목표 달성시 보상</div>
        <div className="bg-gray-200 w-fit px-2 rounded-md mt-1">
          +{reward}냥
        </div>
      </div>
      <div className="bg-white p-4 pb-1 ml-2">
        <div>목표 달성 현황</div>
        <div className="bg-gray-200 w-fit px-2 rounded-md mt-1">
          <span className="font-bold">{savingsInfo.current}</span> /{" "}
          {savingsInfo.goal}냥
        </div>
        <div className="flex justify-center items-center mt-4 mr-2">
          <DonutChart
            percentage={Math.round(
              (savingsInfo.current / savingsInfo.goal) * 100
            )}
          />
        </div>
      </div>
      <button
        className="block bg-blue-800 text-white mx-auto cursor-pointer px-2 py-1 rounded-md my-5"
        onClick={onShowHistory}
      >
        저축 내역 보기
      </button>
    </div>
  );
};

export default SavingsCard;
