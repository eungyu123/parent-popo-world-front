import React from "react";

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, onView, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-8 -right-3 flex flex-col gap-y-[0.275rem] px-2 py-2 bg-white border border-gray-200 rounded-md z-50">
      <button
        onClick={() => {
          onView();
          onClose();
        }}
        className="text-black text-sm whitespace-nowrap hover:bg-gray-100 px-1 py-0.5 rounded"
      >
        조회
      </button>
      <button
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="text-black text-sm whitespace-nowrap hover:bg-gray-100 px-1 py-0.5 rounded"
      >
        수정
      </button>
      <button
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="text-black text-sm whitespace-nowrap hover:bg-gray-100 px-1 py-0.5 rounded"
      >
        삭제
      </button>
    </div>
  );
};
