import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import { ChildNavBar } from "../../components/nav-bar/ChildNavBar";
import { useEffect } from "react";
import { scrollToTop } from "../../utils/scrolltoTop";

export const SavingsLayout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Header title="저축 리포트" backButtonOnClick={() => navigate("/")} />
      <ChildNavBar selectedColor={"#000000"} />
      <Outlet />
    </>
  );
};
