import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "../zustand/auth";

/**
 * API 에러를 처리하기 위한 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(public status: number, public message: string, public data?: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Axios 인스턴스 생성
 * 기본 설정:
 * - baseURL: 환경 변수에서 API URL을 가져오거나 기본값 사용
 * - timeout: 5초
 * - 기본 헤더: Content-Type: application/json
 */

const API_URL = "http://52.78.53.247:8080";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CORS 요청에서 쿠키 전송을 허용
});

/**
 * 요청 인터셉터
 * 모든 요청이 서버로 전송되기 전에 실행됨
 * 주요 기능:
 * 1. 인증 토큰 처리
 * 2. Content-Type 헤더 동적 설정
 */
apiClient.interceptors.request.use(
  (config) => {
    // 1. 인증 토큰 처리
    // 쿠키에서 토큰을 가져와서 Authorization 헤더에 추가
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Content-Type 헤더 동적 설정
    // FormData 여부에 따라 Content-Type을 다르게 설정
    if (!(config.data instanceof FormData)) {
      // 일반 JSON 데이터인 경우
      config.headers["Content-Type"] = "application/json";
    }
    if (config.data instanceof FormData) {
      // 파일 업로드 등 FormData인 경우
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    // 요청 설정 중 에러 발생 시 처리
    return Promise.reject(new ApiError(0, error.message + "요청 설정 중 오류가 발생했습니다."));
  }
);

/**
 * 응답 인터셉터
 * 서버로부터 응답을 받은 후 실행됨
 * 주요 기능:
 * 1. 네트워크 에러 처리
 * 2. HTTP 상태 코드별 에러 처리
 * 3. 인증 에러 시 자동 로그아웃
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // 1. 네트워크 에러 처리
    if (!error.response) {
      return Promise.reject(new ApiError(0, "네트워크 연결을 확인해주세요."));
    }

    if (error.config?.url?.includes("/auth/token/refresh")) {
      Cookies.remove("refreshToken");
      useAuthStore.getState().logout();
      return Promise.reject(new ApiError(401, "인증이 필요합니다."));
    }

    const { status } = error.response;

    if (status === 401) {
      try {
        // refresh 토큰으로 새로운 access 토큰 발급 요청
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const response = await apiClient.post(
          `/auth/token/refresh`,
          {}, // 빈 body
          {
            withCredentials: true,
            headers: {
              "Refresh-Token": refreshToken,
              "Content-Type": "application/json",
            },
          }
        );

        const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
        if (accessToken) {
          useAuthStore.getState().setAccessToken(accessToken);
        }

        // 새로운 access 토큰으로 원래 요청 재시도
        if (error.config) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(error.config);
        }
      } catch (refreshError) {
        // refresh 토큰도 만료된 경우
        Cookies.remove("refreshToken");
        useAuthStore.getState().logout();

        return Promise.reject(new ApiError(401, "세션이 만료되었습니다. 다시 로그인해주세요."));
      }
    }

    // 2. HTTP 상태 코드별 에러 처리
    switch (status) {
      case 400:
        return Promise.reject(new ApiError(status, "잘못된 요청입니다."));
      case 403:
        // 권한 에러
        return Promise.reject(new ApiError(status, "접근 권한이 없습니다."));
      case 404:
        // 리소스를 찾을 수 없음
        return Promise.reject(new ApiError(status, "요청한 리소스를 찾을 수 없습니다."));
      case 500:
        // 서버 에러
        return Promise.reject(new ApiError(status, "서버 에러가 발생했습니다."));
      default:
        // 기타 에러
        return Promise.reject(new ApiError(status, "알 수 없는 에러가 발생했습니다."));
    }
  }
);

export default apiClient;
