import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav-bar/NavBar";

export const BaseLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-300 font-SpoqaHanSansNeo scrollbar-hidden">
      <div className="px-7 pt-6.5 pb-12 mx-auto max-w-md min-h-screen bg-main-white-500 relative overflow-hidden scrollbar-hidden">
        <Outlet />
        <NavBar />
      </div>
    </div>
  );
};
