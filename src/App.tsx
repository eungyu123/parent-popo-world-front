import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./page/home/home";
import { ProductManagementPage } from "./page/store/product-management";
import { PurchaseManagementPage } from "./page/store/purchase-management";
import { PurchaseRequestPage } from "./page/store/purchase-request";
import { StoreLayout } from "./page/store/layout";
import { BaseLayout } from "./page/layout";
import { InvestLayout } from "./page/invest/layout";
import { InvestAnalyzePage } from "./page/invest/invest-analyze";
import { AuthLayout } from "./page/auth/layout";
import { SignInPage } from "./page/auth/sign-in";
import { SignUpPage } from "./page/auth/sign-up";
import { InvestScenarioSelectPage } from "./page/invest/scenario-select";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

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
