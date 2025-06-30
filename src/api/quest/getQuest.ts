import apiClient from "../api";

export const getQuest = async (childId: string, type: string) => {
  try {
    const response = await apiClient.get(`/api/quest/parent?childId=${childId}&type=${type}`);
    return response.data;
  } catch (error) {
    console.error("퀘스트 조회 실패:", error);
    throw error;
  }
};
