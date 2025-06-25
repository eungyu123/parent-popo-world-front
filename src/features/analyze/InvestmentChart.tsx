import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Cell } from "recharts";
import rightArrow from "../../assets/image/common/right-arrow.png";
import { Link } from "react-router-dom";
import { ChildNavBar } from "../../components/nav-bar/ChildNavBar";

type LabelListProps = {
  x?: number | string;
  y?: number | string;
  value?: number | string;
  index?: number;
};

export const InvestmentChart: React.FC = () => {
  const childrenData = [
    { name: "공격적", value: 14 },
    { name: "안정적", value: 11 },
    { name: "소극적", value: 13 },
  ];

  const maxScoreIndex = childrenData.reduce(
    (maxIndex, current, currentIndex, array) => (current.value > array[maxIndex].value ? currentIndex : maxIndex),
    0
  );

  const BarColor = ["#FE4A4E", "#1DB3FB", "#5BCE06"];

  return (
    <section className="py-2 mb-4">
      <div className="rounded-2xl shadow-lg bg-main-white-500 border border-gray-100 p-4 w-full max-w-md ">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-bold">모의투자 게임 자녀 분석</h4>
          <Link to="/analyze/invest">
            <img src={rightArrow} alt="" className="w-4 h-4 object-contain" />
          </Link>
        </div>
        <div className="h-72 flex items-end">
          <ResponsiveContainer className="w-full h-full">
            <BarChart data={childrenData} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A3A3A3", fontSize: 14 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A3A3A3", fontSize: 14 }}
                domain={[0, 24]}
                tickCount={7}
                width={30}
                padding={{ top: 0, bottom: 0 }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                <LabelList
                  dataKey="value"
                  position="top"
                  content={({ x, y, value, index }: LabelListProps) =>
                    index === maxScoreIndex ? (
                      <g>
                        <rect
                          x={Number(x) + 36}
                          y={Number(y) - 36}
                          rx={10}
                          width={36}
                          height={28}
                          fill={BarColor[maxScoreIndex]}
                        />
                        <text
                          x={Number(x) + 54}
                          y={Number(y) - 18}
                          textAnchor="middle"
                          fill="#fff"
                          fontWeight={700}
                          fontSize={14}
                        >
                          {Number(value)}
                        </text>
                      </g>
                    ) : null
                  }
                />
                {childrenData.map((_, idx: number) => (
                  <Cell key={`cell-${idx}`} fill={BarColor[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
