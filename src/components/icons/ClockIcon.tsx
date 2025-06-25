import React from "react";

interface ClockIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const ClockIcon: React.FC<ClockIconProps> = ({ width = 24, height = 24, className = "", color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-clock-icon lucide-clock ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export default ClockIcon;
