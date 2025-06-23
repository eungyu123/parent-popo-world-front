import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  className,
}) => {
  return (
    <button
      className={`text-gray-500 absolute top-1/2 -translate-y-1/2 text-[5rem] cursor-pointer ${
        className || ""
      }`}
      onClick={onClick}
    >
      {direction === "left" ? <MdChevronLeft /> : <MdChevronRight />}
    </button>
  );
};

export default NavigationButton;
