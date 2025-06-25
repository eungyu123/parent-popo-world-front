import React from "react";

interface DollarSignIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const DollarSignIcon: React.FC<DollarSignIconProps> = ({
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
      className={`lucide lucide-badge-cent-icon lucide-badge-cent ${className}`}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="M12 7v10" />
      <path d="M15.4 10a4 4 0 1 0 0 4" />
    </svg>
  );
};

export default DollarSignIcon;
