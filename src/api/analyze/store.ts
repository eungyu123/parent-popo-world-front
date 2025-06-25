import axios from "axios";

export const getStoreAnalyze = async ({ child_id }: { child_id: string }) => {
  try {
    const response = await axios.get(`http://43.203.175.69:8001/api/dashboard/${child_id}?day=7`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("store 분석 데이터 조회 중 에러 발생:", error);
    throw error;
  }
};
