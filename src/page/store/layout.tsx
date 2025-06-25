import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import { ChildNavBar } from "../../components/nav-bar/ChildNavBar";
import { useState, useEffect } from "react";
import clsx from "clsx";

const urls = {
  "product-management": "상품관리",
  "purchase-management": "구매관리",
  "purchase-request": "사용확인",
  analyze: "구매분석",
};

export const StoreLayout: React.FC = () => {
  const url = useLocation();
  const pathname = url.pathname.split("/")[2];
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(urls[pathname as keyof typeof urls]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsTabOpen(false);
  }, [pathname]);

  return (
    <>
      <Header title={selectedTab} onClick={() => setIsTabOpen(!isTabOpen)} backButtonOnClick={() => navigate("/")}>
        {isTabOpen && (
          <ul className="absolute top-14.5 -right-2.5 flex flex-col bg-white p-2 rounded-xl shadow-custom-2 border border-gray-100 items-center gap-y-1">
            <Link to="/store/product-management">
              <li
                className={clsx("text-xs", selectedTab === "상품관리" ? "text-black font-medium" : "text-gray-400")}
                onClick={() => setSelectedTab("상품관리")}
              >
                상품관리
              </li>
            </Link>
            <Link to="/store/purchase-management">
              <li
                className={clsx("text-xs", selectedTab === "구매관리" ? "text-black font-medium" : "text-gray-400")}
                onClick={() => setSelectedTab("구매관리")}
              >
                구매관리
              </li>
            </Link>
            <Link to="/store/purchase-request">
              <li
                className={clsx("text-xs k", selectedTab === "사용요청" ? "text-black font-medium" : "text-gray-400")}
                onClick={() => setSelectedTab("사용요청")}
              >
                사용요청
              </li>
            </Link>
          </ul>
        )}
      </Header>
      <ChildNavBar selectedColor={"#000000"} />
      <Outlet />
    </>
  );
};
