import apiClient from "../api";
import { ApiError } from "../api";

// 시나리오 아이템 타입 정의
export interface ScenarioItem {
  scenarioId: string;
  childId: string;
  story: string;
  isCustom: boolean;
  createAt: string;
  updatedAt: string;
}

interface ScenarioList {
  scenarioList: ScenarioItem[];
  totalPageSize: string;
}

/**
 * 시나리오 목록을 가져오는 함수
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지당 아이템 수
 * @returns 페이지네이션된 시나리오 목록
 * @throws ApiError 네트워크 에러, 인증 에러, 서버 에러 등
 */
export const getScenarioList = async (
  page: number,
  size: number,
  childId: string,
  chatbotId: string
): Promise<ScenarioList> => {
  try {
    const response = await apiClient.post<ScenarioList>("/api/chatbot/items", {
      page,
      size,
      childId,
      chatbotId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      // 이미 ApiError로 처리된 경우 그대로 전파
      throw error;
    }

    // 예상치 못한 에러 처리
    console.error("시나리오 목록 조회 중 에러 발생:", error);
    throw new ApiError(500, "시나리오 목록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
// 응답
// [
//     {
//       "scenarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "childId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "story": "string",
//       "isCustom": true,
//       "createAt": "2025-06-13T06:12:10.391Z",
//       "updatedAt": "2025-06-13T06:12:10.391Z"
//     }
//  ]
