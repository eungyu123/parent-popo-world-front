// import { useState } from "react";
// import { uploadImageToCloudinary } from "../../../components/cloudinary/cloudinary";
// import apiClient from "../../../api/api";
// import { useAuthStore } from "../../../zustand/auth";
// import { Modal } from "../../../components/modal/Modal";
// import { CategoryDropdown } from "../../../features/quest/CategoryDropdown";
// import { IMAGE_URLS } from "../../../constants/constants";
import { QuestApprovalTime } from "./QuestApprovalTime";
import { QuestCompletionChart } from "./QuestCompletionChart";
import { QuestCompletionTimeChart } from "./QuestCompletionTimeChart";
import { QuestRewardScatterChart } from "./QuestRewardScatterChart";

export const AnalyzeQuestPage = () => {
  return (
    <div className="overflow-scroll scrollbar-hidden flex flex-col gap-4">
      {/* 퀘스트 완료율 그래프 */}
      <QuestCompletionChart />
      <QuestCompletionTimeChart />
      <QuestRewardScatterChart />
      <QuestApprovalTime />
    </div>
  );
};
