import { useNavigate, useLocation } from "react-router-dom";
import { useModalStore } from "../../zustand/modal";
import homeIcon from "../../assets/image/navbar/homeIcon.png";
import analyzeIcon from "../../assets/image/navbar/analyzeIcon.png";
import shopIcon from "../../assets/image/navbar/shopIcon.png";
import mypageIcon from "../../assets/image/navbar/mypageIcon.png";
import { scrollToTop } from "../../utils/scrolltoTop";

interface NavItem {
  icon: string;
  path: string;
}

// 네비바를 숨길 페이지 경로 목록
const hideNavBarPaths = ["/login", "/signup"];

const navItems: NavItem[] = [
  {
    icon: homeIcon,
    path: "/",
  },
  {
    icon: analyzeIcon,
    path: "/analyze",
  },
  {
    icon: shopIcon,
    path: "/store/product-management",
  },
  {
    icon: mypageIcon,
    path: "/mypage",
  },
];

export const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAnyModalOpen = useModalStore((state) => state.isAnyModalOpen);

  // 현재 페이지에서 네비바를 숨길지 확인
  const shouldHideNavBar = () => {
    return (
      hideNavBarPaths.some((path) => location.pathname.startsWith(path)) ||
      isAnyModalOpen
    ); // 모달이 열려있을 때도 숨김
  };

  // 네비바를 숨겨야 하면 null 반환
  if (shouldHideNavBar()) {
    return null;
  }

  const handleNavClick = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#B69E86]/65 backdrop-blur-md z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <img
                src={item.icon}
                alt="navigation icon"
                className={`w-full h-full object-contain transition-all duration-200 ${
                  isActive(item.path)
                    ? "brightness-0 saturate-100 invert-[0.3] sepia-[1] saturate-[5] hue-rotate-[200deg]"
                    : "opacity-100 hover:brightness-0 hover:saturate-100 hover:invert-[0.3] hover:sepia-[1] hover:saturate-[5] hover:hue-rotate-[200deg] hover:opacity-100"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
