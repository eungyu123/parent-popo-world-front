import apiClient from "../api";

export const postPushMessage = async ({ childId, message }: { childId: string; message: string }) => {
  try {
    const response = await apiClient.post("/api/push/message", {
      userId: childId,
      role: "Child",
      message: message,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to alert", error);
    throw error;
  }
};
