import { useAuthStore } from "../../zustand/auth";
import Cookies from "js-cookie";
import { EventSourcePolyfill } from "event-source-polyfill";

type MessageHandler = (data: any) => void;

export const connectChatBot = (onMessage: MessageHandler) => {
  const token = useAuthStore.getState().accessToken;
  const Refresh_key = Cookies.get("refreshToken");

  try {
    const eventSource = new EventSourcePolyfill(`http://52.78.53.247:8080/api/chatbot/sse`, {
      headers: {
        "Content-Type": "text/event-stream",
        Authorization: `Bearer ${token}`,
        Refresh_key: `Bearer ${Refresh_key}`,
      },
      withCredentials: true,
    });

    // 메시지 이벤트 리스너
    eventSource.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        onMessage(data); // 메시지 핸들러 호출
      } catch (error) {
        console.error("메시지 파싱 에러:", error);
      }
    });

    // 에러 이벤트 리스너
    eventSource.onerror = (error) => {
      console.error("SSE 연결 에러:", error);
      eventSource.close();
      // 여기에 재연결 로직이나 에러 처리 로직 추가 가능
    };

    // 연결 성공 이벤트 리스너
    eventSource.onopen = () => {
      console.log("SSE 연결 성공");
    };

    return eventSource;
  } catch (error) {
    console.error("SSE 연결 초기화 중 에러 발생:", error);
    return null; // 에러 발생 시 null 반환
  }
};
