// src/api/invest/edit-scenario.ts
import apiClient, { ApiError } from "../api";

export const editScenario = async (scenarioId: string): Promise<void> => {
  try {
    await apiClient.post("/api/chatbot/edit-scenario", { scenarioId }); // scenarioId를 객체로 감싸서 전달
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("시나리오 목록 조회 중 에러 발생:", error);
    throw new ApiError(500, "시나리오 목록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
