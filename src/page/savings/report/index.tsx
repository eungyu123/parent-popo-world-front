import React, { useState, useEffect } from "react";
import { fetchSavingsAccounts } from "../../../api/savings/api";
import type { SavingsAccount } from "../../../api/savings/type";
import SavingsHistoryModal from "../../../features/savings/SavingsHistoryModal";
import SavingsCard from "../../../features/savings/SavingsCard";
import NavigationButton from "../../../features/savings/NavigationButton";
import { useAuthStore } from "../../../zustand/auth";
import xpopo from "../../../assets/image/common/x_popo.png";
import { useQuery } from "@tanstack/react-query";
// 날짜 포맷 변환 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

export const SavingsReportPage: React.FC = () => {
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const { selectedChildId } = useAuthStore();

  // prettier-ignore
  const {data: accounts, isLoading, error} = useQuery<SavingsAccount[]>({
    queryKey: ["savingsAccounts", selectedChildId],
    queryFn: () => fetchSavingsAccounts(selectedChildId || ""),
    enabled: !!selectedChildId,
  });

  useEffect(() => {
    if (accounts) {
      // 최신순으로 정렬
      const sortedAccounts = accounts?.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
      setSavingsAccounts(sortedAccounts);
      setCurrentIndex(0);
    }
  }, [savingsAccounts]);

  if (!selectedChildId) {
    return <div className="flex justify-center items-center flex-1 text-gray-500">자녀를 선택해주세요.</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center flex-1">로딩중...</div>;
  }

  if (error || savingsAccounts.length === 0) {
    return (
      <>
        <img src={xpopo} alt="xpopo" className="w-50 h-60 mx-auto ml-20 mt-10 mb-10" />
        <div className="flex justify-center items-center flex-1 text-lg font-bold">
          {error instanceof Error ? error.message : "데이터가 존재하지 않습니다."}
        </div>
      </>
    );
  }

  const currentAccount = savingsAccounts[currentIndex];
  const mappedDeposits = currentAccount.deposits.map((deposit) => ({
    date: formatDate(deposit.depositDate),
    name: deposit.childName,
    amount: deposit.depositAmount,
    total: deposit.accountPointAfter,
  }));

  return (
    <div className="flex flex-col items-center relative flex-1 pt-8">
      {currentIndex > 0 && (
        <NavigationButton direction="left" onClick={() => setCurrentIndex(currentIndex - 1)} className="left-[-3rem]" />
      )}
      <SavingsCard
        savingsInfo={{
          current: currentAccount.currentAccountPoint,
          goal: currentAccount.goalAmount,
          start: formatDate(currentAccount.createdDate),
          end: formatDate(currentAccount.endDate),
          status: currentAccount.status,
          history: mappedDeposits,
        }}
        onShowHistory={() => setShowHistory(true)}
      />
      <SavingsHistoryModal open={showHistory} onClose={() => setShowHistory(false)} history={mappedDeposits} />
      {currentIndex < savingsAccounts.length - 1 && (
        <NavigationButton
          direction="right"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className="right-[-3rem]"
        />
      )}
    </div>
  );
};
