import type{ SavingsAccount } from "../savings/type";

export const savingsList: SavingsAccount[] = [
  {
    id: 1,
    current: 1200, // 현재 저축 금액
    goal: 2000, // 목표 저축 금액
    start: "2025.06.20", // 시작일
    end: "2025.09.15", // 종료일
    reward: 200, // 목표 달성시 보상
    history: [
      { date: "7월 19일", name: "이현기", amount: 100, total: 2100 },
      { date: "7월 18일", name: "이현기", amount: 100, total: 2000 },
      { date: "7월 17일", name: "이현기", amount: 100, total: 1900 },
      { date: "7월 16일", name: "이현기", amount: 100, total: 1800 },
      { date: "7월 19일", name: "이현기", amount: 100, total: 2100 },
      { date: "7월 18일", name: "이현기", amount: 100, total: 2000 },
      { date: "7월 17일", name: "이현기", amount: 100, total: 1900 },
      { date: "7월 16일", name: "이현기", amount: 100, total: 1800 },
    ],
  },
  {
    id: 2,
    current: 1500,
    goal: 1500,
    start: "2025.03.01",
    end: "2025.06.01",
    reward: 150,
    history: [
      { date: "6월 1일", name: "이현기", amount: 200, total: 1500 },
      { date: "5월 20일", name: "이현기", amount: 100, total: 1300 },
      { date: "5월 10일", name: "이현기", amount: 200, total: 1200 },
    ],
  },
];
