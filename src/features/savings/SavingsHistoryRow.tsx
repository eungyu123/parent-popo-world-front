import React from "react";
import PopoImg from "../../assets/image/common/popo.png";

interface SavingsHistoryItem {
  date: string;
  name: string;
  amount: number;
  total: number;
}

interface Props {
  item: SavingsHistoryItem;
}

export const SavingsHistoryRow: React.FC<Props> = ({ item }) => {
  return (
    <div className="p-4 border-b border-gray-100">
      {/* 날짜 */}
      <div className="text-[0.7rem] text-gray-600 mb-1 ml-1">{item.date}</div>

      {/* 프로필, 이름, 금액 정보 */}
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-13 h-13 rounded-xl bg-blue-100 flex items-center justify-center">
            <img src={PopoImg} alt="프로필" className="w-10 h-10" />
          </div>
          <div className="ml-3 text-[1rem] text-gray-800">{item.name}</div>
        </div>

        {/* 금액 정보 */}
        <div className="text-right">
          <div className="text-[1.25rem] text-blue-600 font-medium">
            +{item.amount.toLocaleString()}냥
          </div>
          <div className="text-[0.875rem] text-gray-500">
            잔액: {item.total.toLocaleString()}냥
          </div>
        </div>
      </div>
    </div>
  );
};
