import React from "react";

interface CalendarIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  width = 24,
  height = 24,
  className = "",
  color = "currentColor",
}) => {
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
      className={`lucide lucide-calendar-icon lucide-calendar ${className}`}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
};

export default CalendarIcon;
