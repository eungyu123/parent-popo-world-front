import { useState } from "react";
import { ChildNavBar } from "../../components/nav-bar/ChildNavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom";
import clsx from "clsx";

const urls = {
  "create-quest": "퀘스트 생성",
  "quest-list": "퀘스트 현황",
};

export const QuestLayout = () => {
  const url = useLocation();
  const pathname = url.pathname.split("/")[2];
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    urls[pathname as keyof typeof urls]
  );
  const navigate = useNavigate();
  return (
    <>
      <Header
        title={selectedTab}
        onClick={() => setIsTabOpen(!isTabOpen)}
        backButtonOnClick={() => navigate("/")}
      >
        {isTabOpen && (
          <ul className="absolute top-14.5 -right-2.5 flex flex-col bg-white p-2 rounded-xl shadow-custom-2 border border-gray-100 items-center gap-y-1">
            <Link to="/quest/create-quest">
              <li
                className={clsx(
                  "text-xs",
                  selectedTab === "퀘스트 생성"
                    ? "text-black font-medium"
                    : "text-gray-400"
                )}
                onClick={() => setSelectedTab("퀘스트 생성")}
              >
                퀘스트 생성
              </li>
            </Link>
            <Link to="/quest/quest-list">
              <li
                className={clsx(
                  "text-xs",
                  selectedTab === "퀘스트 현황"
                    ? "text-black font-medium"
                    : "text-gray-400"
                )}
                onClick={() => setSelectedTab("퀘스트 현황")}
              >
                퀘스트 현황
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
