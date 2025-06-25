import React from "react";
import { SavingsHistoryRow } from "./SavingsHistoryRow";

interface SavingsHistoryItem {
  date: string;
  name: string;
  amount: number;
  total: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  history: SavingsHistoryItem[];
}

const SavingsHistoryModal: React.FC<Props> = ({ open, onClose, history }) => {
  // 모달이 열릴 때 body 스크롤 막기
  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (open) {
      // body 스크롤 막기
      document.body.style.cssText = `
        overflow: hidden !important;
        touch-action: none !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
      `;
    }

    // cleanup function - 모달이 닫힐 때 원래 상태로 복구
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [open]);

  if (!open) return null;

  // 모달 배경 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center touch-none"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white h-[36.7rem] w-[20rem] rounded-2xl overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-800 h-[3rem] text-[1.2rem] flex items-center justify-center text-white sticky top-0 z-10">
          저축 내역
          <button
            className="cursor-pointer text-[1rem] text-blue-800 font-bold absolute right-3 bg-gray-100 rounded-full w-6 h-6 text-center"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <SavingsHistoryRow key={idx} item={item} />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              저축 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsHistoryModal;
