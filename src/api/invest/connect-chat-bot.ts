// const Access_key = sessionStorage.getItem("Access_key");
// const Refresh_key = sessionStorage.getItem("Refresh_key");

// const EventSource = EventSourcePolyfill;
// useEffect(() => {
//   if (isLoggedIn) {
//     try {
//       const fetchSse = async () => {
//         const eventSource = new EventSource(
//           `https://moment-backend.shop/sse/chat/alarm/${userId}`,
//           {
//             headers: {
//               "Content-Type": "text/event-stream",
//               ACCESS_KEY: `${Access_key}`,
//               REFRESH_KEY: `${Refresh_key}`,
//             },
//             withCredentials: true,
//           }
//         );
//         eventSource.addEventListener("chatAlarm-event", (event) => {
//           const eventData = JSON.parse(event.data);
//           console.log("Received event:", eventData);
//           setAlarmList((prevList) => [...prevList, eventData]);
//         });
//       };
//       fetchSse();
//     } catch (error) {
//       throw error;
//     }
//   }
// }, [isLoggedIn]);

export const connectChatBot = () => {
  try {
    const eventSource = new EventSource(`http://52.78.53.247:8080/api/chatbot/sse`);

    // 메시지 이벤트 리스너
    eventSource.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        // 여기에 메시지 처리 로직 추가
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
