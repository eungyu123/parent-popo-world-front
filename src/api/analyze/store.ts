import apiClient from "../api";

export const getStoreAnalyze = async ({ child_id }: { child_id: string }) => {
  try {
    console.log(child_id);
    const response = await apiClient.get(`/api/dashboard/${child_id}?day=7`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("store 분석 데이터 조회 중 에러 발생:", error);
    throw error;
  }
};
