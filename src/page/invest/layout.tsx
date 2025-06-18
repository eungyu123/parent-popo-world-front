import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import { ChildNavBar } from "../../components/nav-bar/ChildNavBar";
import { useState } from "react";
import clsx from "clsx";

// http://localhost:5174/invest/analyze
// http://localhost:5174/invest/chat-bot

const urls = {
  analyze: "모의투자 분석",
  "chat-bot": "시나리오 챗봇",
  "scenario-select": "시나리오 선택",
};

export const InvestLayout: React.FC = () => {
  const url = useLocation();
  const pathname = url.pathname.split("/")[2];
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(urls[pathname as keyof typeof urls]);
  const navigate = useNavigate();

  return (
    <>
      <Header title={selectedTab} onClick={() => setIsTabOpen(!isTabOpen)} backButtonOnClick={() => navigate("/")}>
        {isTabOpen && (
          <ul className="absolute top-14.5 -right-2.5 flex flex-col bg-white p-2 rounded-xl shadow-custom-2 border border-gray-100 items-center gap-y-1">
            <Link to="/invest/analyze">
              <li
                className={clsx(
                  "text-xs ",
                  selectedTab === "모의투자 분석" ? "text-black font-medium" : "text-gray-400"
                )}
                onClick={() => setSelectedTab("모의투자 분석")}
              >
                모의투자 분석
              </li>
            </Link>
            <Link to="/invest/scenario-select">
              <li
                className={clsx(
                  "text-xs ",
                  selectedTab === "시나리오 선택" ? "text-black font-medium" : "text-gray-400"
                )}
                onClick={() => setSelectedTab("시나리오 선택")}
              >
                시나리오 선택
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
