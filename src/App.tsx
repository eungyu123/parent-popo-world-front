import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./page/home/home";
import { ProductManagementPage } from "./page/store/product-management";
import { PurchaseManagementPage } from "./page/store/purchase-management";
import { PurchaseRequestPage } from "./page/store/purchase-request";
import { StoreLayout } from "./page/store/layout";
import { QuestLayout } from "./page/quest/layout";
import { BaseLayout } from "./page/layout";
// import { InvestLayout } from "./page/invest/layout";
import { InvestAnalyzePage } from "./page/invest/invest-analyze";
import { AuthLayout } from "./page/auth/layout";
import { SignInPage } from "./page/auth/sign-in";
import { SignUpPage } from "./page/auth/sign-up";
import { InvestScenarioSelectPage } from "./page/invest/scenario-select";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { QuestListPage } from "./page/quest/quest-list";
import { CreateQuestPage } from "./page/quest/create-quest";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* prettier-ignore */}
          <Route path="/" element={<ProtectedRoute><BaseLayout /></ProtectedRoute>}>
            <Route index element={<HomePage />} />
            <Route path="/store" element={<StoreLayout />}>
              <Route path="product-management" element={<ProductManagementPage />} />
              <Route path="purchase-management" element={<PurchaseManagementPage />} />
              <Route path="purchase-request" element={<PurchaseRequestPage />} />
            </Route>
            {/* 모의투자 */}
            <Route path="/invest">
              <Route path="scenario-select" element={<InvestScenarioSelectPage />} />
            </Route>
            {/* 모의투자 레이아웃(헤더) 얘는 다른거라서 따로 빼둠 */}
            {/* <Route path="/invest/chat-bot" element={<InvestChatBotPage />} /> */}

            {/* 퀘스트 */}
            <Route path="/quest" element={<QuestLayout />}>
              <Route path="create-quest" element={<CreateQuestPage />} />
              <Route path="quest-list" element={<QuestListPage/>}/>
            </Route>
            {/* 분석센터 */}
            <Route path="/analyze">
              <Route path="invest" element={<InvestAnalyzePage />} />
            </Route>
          </Route>
          {/* 로그인, 회원가입 */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
      <div id="modal-root" />
    </>
  );
}

export default App;
