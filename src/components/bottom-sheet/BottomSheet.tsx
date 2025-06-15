import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children, className }) => {
  const [isOpenTransition, setIsOpenTransition] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsOpenTransition(true);
      setIsClosed(false);
    } else {
      setIsOpenTransition(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpenTransition && !isOpen) {
      setIsClosed(true);
    }
  };

  if (!isOpen && isClosed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx("fixed inset-0 bg-black/50 z-40", isOpen ? "bg-black/50" : "bg-transparent")}
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 transition-all duration-500 ease-in-out",
          "max-w-md mx-auto",
          className
        )}
        style={{
          transform: isOpenTransition ? "translateY(0)" : "translateY(100%)",
        }}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />
        {/* Content */}
        <div className="px-8 pt-3 pb-8 ">{children}</div>
      </div>
    </>
  );
};
