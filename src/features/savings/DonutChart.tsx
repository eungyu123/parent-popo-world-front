import React from "react";

interface DonutChartProps {
  percentage: number; // 0~100
  size?: number; // 원 크기(px)
  strokeWidth?: number; // 두께(px)
  color?: string; // 진행 색상
  bgColor?: string; // 배경 색상
  textColor?: string; // 퍼센트 글씨 색상
}

export const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  size = 100,
  strokeWidth = 15,
  color = "url(#gradient)",
  bgColor = "#E5E5E5",
  textColor = "#222",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A7A6FB" />
          <stop offset="100%" stopColor="#5ED6FF" />
        </linearGradient>
      </defs>
      {/* 배경 원 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* 퍼센트 원 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* 퍼센트 텍스트 */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize={size * 0.22}
        fontWeight="bold"
        fill={textColor}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default DonutChart;
