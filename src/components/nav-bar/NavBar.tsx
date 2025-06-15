import { useState, useEffect } from "react";
import gray_back from "../../assets/image/navbar/gray_bank.png";
import gray_home from "../../assets/image/navbar/gray_home.png";
import gray_chart from "../../assets/image/navbar/gray_chart.png";
import gray_store from "../../assets/image/navbar/gray_store.png";
import gray_setup from "../../assets/image/navbar/gray_setup.png";

export const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 mx-auto max-w-md mb-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-[200%]"
      }`}
    >
      <div className="flex justify-between bg-black/20 rounded-2xl w-[calc(100%-4rem)] mx-auto px-8 py-3">
        <img src={gray_back} alt="" className="w-6 h-6 object-contain" />
        <img src={gray_home} alt="" className="w-6 h-6 object-contain" />
        <img src={gray_chart} alt="" className="w-6 h-6 object-contain" />
        <img src={gray_store} alt="" className="w-6 h-6 object-contain" />
        <img src={gray_setup} alt="" className="w-6 h-6 object-contain" />
      </div>
    </div>
  );
};
