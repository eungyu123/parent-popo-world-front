import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

interface PushNotificationProviderProps {
  queryClient: QueryClient;
}

const PushNotificationProvider = ({ queryClient }: PushNotificationProviderProps) => {
  useEffect(() => {
    // 서비스 워커로부터 메시지 수신
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "PUSH_NOTIFICATION_RECEIVED") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        if (event.data.data.includes("퀘스트")) {
          queryClient.invalidateQueries({ queryKey: ["quest"] });
        }
        if (event.data.data.includes("상품")) {
          queryClient.invalidateQueries({ queryKey: ["purchase-request"] });
          queryClient.invalidateQueries({ queryKey: ["purchase-management"] });
          queryClient.invalidateQueries({ queryKey: ["storeItems"] });
        }
        if (event.data.data.includes("통장")) {
          queryClient.invalidateQueries({ queryKey: ["savingsAccounts"] });
        }
      }
    };
    // 메시지 리스너 등록
    navigator.serviceWorker.addEventListener("message", handleMessage);

    // 클린업
    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, [queryClient]);

  return <Outlet />;
};

export default PushNotificationProvider;
