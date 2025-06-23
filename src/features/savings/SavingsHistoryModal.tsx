import React from "react";
import type { SavingsHistory } from "../../api/savings/type";
import { SavingsHistoryRow } from "./SavingsHistoryRow";

interface Props {
  open: boolean;
  onClose: () => void;
  history: SavingsHistory[];
}

const SavingsHistoryModal: React.FC<Props> = ({ open, onClose, history }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white h-[32rem] w-[20rem] rounded-2xl overflow-y-auto relative">
        <div className="bg-blue-800 h-[3rem] text-[1.2rem] flex items-center justify-center text-white sticky top-0 z-10">
          저축내역
          <button
            className="cursor-pointer text-[1rem] text-blue-800 font-bold absolute right-3 bg-gray-100 rounded-full w-6 h-6 text-center"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {history.map((item, idx) => (
          <SavingsHistoryRow key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SavingsHistoryModal;
