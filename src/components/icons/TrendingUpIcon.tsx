import React from "react";

interface TrendingUpIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const TrendingUpIcon: React.FC<TrendingUpIconProps> = ({
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
      className={`lucide lucide-trending-up-icon lucide-trending-up ${className}`}
    >
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </svg>
  );
};

export default TrendingUpIcon;
