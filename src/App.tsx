import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./page/home/home";
import { ProductManagementPage } from "./page/store/product-management";
import { PurchaseManagementPage } from "./page/store/purchase-management";
import { PurchaseRequestPage } from "./page/store/purchase-request";
import { StoreLayout } from "./page/store/layout";
import { QuestLayout } from "./page/quest/layout";
import { BaseLayout } from "./page/layout";
import { InvestAnalyzePage } from "./page/AnalyzeCenter/invest";
import { AuthLayout } from "./page/auth/layout";
import { SignInPage } from "./page/auth/sign-in";
import { SignUpPage } from "./page/auth/sign-up";
import { InvestScenarioSelectPage } from "./page/invest/scenario-select";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { QuestListPage } from "./page/quest/quest-list";
import { CreateQuestPage } from "./page/quest/create-quest";
import { SavingsReportPage } from "./page/savings/report";
import { SavingsLayout } from "./page/savings/layout";
import { ProductAnalyzePage } from "./page/AnalyzeCenter/store/ProductAnalyzePage";
import { AnalyzeCenterPage } from "./page/AnalyzeCenter";
import { AnalyzeCenterLayout } from "./page/AnalyzeCenter/layout";
import { MyPage } from "./page/mypage";
import { AnalyzeQuestPage } from "./page/AnalyzeCenter/quest";
import PushNotificationProvider from "./components/layout/PushNotificationProvider";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PushNotificationProvider queryClient={queryClient} />}>
            {/* 홈 */}
            {/* prettier-ignore */}
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            {/* prettier-ignore */}
            <Route path="/" element={<ProtectedRoute><BaseLayout /></ProtectedRoute>}>
            {/* 상점 */}
            <Route path="/store" element={<StoreLayout />}>
              <Route path="product-management" element={<ProductManagementPage />} />
              <Route path="purchase-management" element={<PurchaseManagementPage />} />
              <Route path="purchase-request" element={<PurchaseRequestPage />} />
            </Route>

            {/* 모의투자 */}
            <Route path="/invest/scenario-select" element={<InvestScenarioSelectPage />} />
            <Route path="/invest/chat-bot" element={<InvestAnalyzePage />} />

            {/* 퀘스트 */}
            <Route path="/quest" element={<QuestLayout />}>
              <Route path="create-quest" element={<CreateQuestPage />} />
              <Route path="quest-list" element={<QuestListPage/>}/>
            </Route>

            {/* 분석센터 */}
            <Route path="/analyze" element={<AnalyzeCenterLayout />}>
              <Route index element={<AnalyzeCenterPage />} />
              <Route path="invest" element={<InvestAnalyzePage />} />
              <Route path="store" element={<ProductAnalyzePage />} />
              <Route path="quest" element={<AnalyzeQuestPage/>}/>
            </Route>

            {/* 저축 리포트 */}
            <Route path="/savings" element={<SavingsLayout />}>
              <Route path="report" element={<SavingsReportPage />} />
            </Route>

            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />} />
          </Route>

            {/* 로그인, 회원가입 */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <div id="modal-root" />
    </QueryClientProvider>
  );
}

export default App;
