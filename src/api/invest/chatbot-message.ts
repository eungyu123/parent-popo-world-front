import apiClient from "../api";

export const sendChatbotMessage = async ({ message }: { message: string }) => {
  try {
    const response = await apiClient.post("/api/chatbot/message", { editRequest: message });
    return response.data;
  } catch (error) {
    console.error("챗봇 메시지 전송 중 에러 발생:", error);
    throw error;
  }
};
