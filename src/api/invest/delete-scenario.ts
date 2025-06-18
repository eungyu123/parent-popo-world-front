import apiClient, { ApiError } from "../api";

export const deleteScenario = async (scenarioId: string) => {
  try {
    const response = await apiClient.delete(`/api/chatbot/delete`, {
      data: {
        scenarioId,
      },
    });
    if (response.status == 200) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    return false;
  }
};
