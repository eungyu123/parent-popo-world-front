import React from "react";

// interface Theme {
//   id: string;
//   name: string;
//   color: string;
// }

interface ThemeSelectorProps {
  bgColor: string;
  name: string;
  onClick: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ bgColor, name, onClick }) => {
  return (
    <div
      className="px-2 py-1 text-main-white-500 rounded-sm text-sm whitespace-nowrap active:scale-95 transition-all duration-100"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default ThemeSelector;
