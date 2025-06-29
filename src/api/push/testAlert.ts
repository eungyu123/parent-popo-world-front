import apiClient from "../../api/api";

export const testAlert = async () => {
  try {
    const response = await apiClient.get("/api/push/test-alert");
    console.log(response);
  } catch (error) {
    console.error("Failed to test alert", error);
    throw error;
  }
};
