// src/api/invest/save-scenario.ts
import apiClient, { ApiError } from "../api";

export const saveScenario = async (childId: string): Promise<boolean | undefined> => {
  try {
    const response = await apiClient.post("/api/chatbot/save", { childId });
    console.log(childId);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    return false;
  }
};
