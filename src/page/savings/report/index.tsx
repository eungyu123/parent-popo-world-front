import React, { useState } from "react";
import { savingsList } from "../../../api/savings/dummyData";
import SavingsHistoryModal from "../../../features/savings/SavingsHistoryModal";
import SavingsCard from "../../../features/savings/SavingsCard";
import NavigationButton from "../../../features/savings/NavigationButton";

export const SavingsReportPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const savingsInfo = savingsList[currentIndex];
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex flex-col items-center relative">
      {currentIndex > 0 && (
        <NavigationButton
          direction="left"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="left-[-3rem]"
        />
      )}
      <SavingsCard
        savingsInfo={savingsInfo}
        onShowHistory={() => setShowHistory((prev) => !prev)}
      />
      <SavingsHistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        history={savingsInfo.history}
      />
      {currentIndex < savingsList.length - 1 && (
        <NavigationButton
          direction="right"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className="right-[-3rem]"
        />
      )}
    </div>
  );
};
