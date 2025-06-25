import apiClient from "../api";

export const getInvestAnalyze = async ({
  graph,
  range,
  selectedChildId,
}: {
  graph: string;
  range: string;
  selectedChildId: string;
}) => {
  try {
    console.log("selectedChildId", selectedChildId);
    // /api/invest/{graph}/{range}
    const response = await apiClient.post(`/api/invest/${graph}/${range}`, selectedChildId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("invest 분석 데이터 조회 중 에러 발생:", error);
    throw error;
  }
};

// avg_stay_time
// buy_ratio
// sell_ratio
// buy_sell_ratio
// bet_ratio
// avg_cash_ratio
// invest_style
