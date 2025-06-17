// src/api/invest/save-scenario.ts
import apiClient, { ApiError } from "../api";

export const saveScenario = async (childId: string): Promise<void> => {
  try {
    await apiClient.post("/api/chatbot/save", { childId });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
  }
};
