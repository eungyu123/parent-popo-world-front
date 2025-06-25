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
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      withCredentials: true,
    });

    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;
    const reconnectDelay = 3000; // 3초

    // 메시지 이벤트 리스너
    eventSource.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        onMessage(data);
        // 메시지를 받으면 재연결 시도 횟수 초기화
        reconnectAttempts = 0;
      } catch (error) {
        console.error("메시지 파싱 에러:", error);
      }
    });

    // 에러 이벤트 리스너
    eventSource.addEventListener("error", (event) => {
      console.error("SSE 연결 에러 - 상태:", eventSource.readyState);
      console.error("SSE 연결 에러 - URL:", eventSource.url);
      console.error("SSE 연결 에러 - 전체 에러:", event);

      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(`재연결 시도 ${reconnectAttempts}/${maxReconnectAttempts}`);

        setTimeout(() => {
          if (eventSource.readyState === 0) {
            // 연결이 닫혀있는 경우에만
            eventSource.close();
            connectChatBot(onMessage);
          }
        }, reconnectDelay);
      } else {
        console.error("최대 재연결 시도 횟수 초과");
        eventSource.close();
      }
    });

    // 연결 성공 이벤트 리스너
    eventSource.addEventListener("open", () => {
      console.log("SSE 연결 성공 - URL:", eventSource.url);
      reconnectAttempts = 0; // 연결 성공시 재연결 시도 횟수 초기화
    });

    return eventSource;
  } catch (error) {
    console.error("SSE 연결 초기화 중 에러 발생:", error);
    return null;
  }
};
