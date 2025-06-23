import React from "react";
import PopoImg from "../../assets/image/common/popo.png";
import type {SavingsHistory} from "../../api/savings/type";

interface Props {
  item: SavingsHistory;
}

export const SavingsHistoryRow: React.FC<Props> = ({ item }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="bg-purple-200 w-15 h-15 rounded-xl mt-8 ml-5 flex items-center justify-center relative">
      <img src={PopoImg} alt="포포" className="w-12 h-12" />
      <span className="absolute text-sm top-[-1.3rem]">{item.date}</span>
    </div>
    <div className="text-lg mt-8 ml-[-7rem]">{item.name}</div>
    <div className="flex flex-col mr-5 mt-8">
      <span className="text-blue-500">+{item.amount}</span>
      <span>{item.total}</span>
    </div>
  </div>
);
