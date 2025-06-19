// CategoryDropdown.tsx
import { useState } from "react";

const labelOptions = [
  { label: "생활습관", value: "HABIT" },
  { label: "학습", value: "STUDY" },
  { label: "집안일", value: "HOUSEHOLD" },
  { label: "심부름", value: "ERRAND" },
  { label: "포포월드 기능", value: "POPO" },
  { label: "기타", value: "ETC" },
];

export const CategoryDropdown = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = labelOptions.find(
    (item) => item.value === selected
  )?.label;

  return (
    <div className="relative w-full">
      <label className="block font-medium text-gray-800 mb-2">카테고리</label>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-4 py-2 bg-[#fffdf9] border border-gray-300 rounded-xl text-sm font-medium text-gray-800 shadow-sm  focus:outline-none"
      >
        {selectedLabel || "카테고리를 선택하세요"}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow z-20">
          {labelOptions.map(({ label, value }) => (
            <li
              key={value}
              onClick={() => {
                setSelected(value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#fff4ec] transition ${
                selected === value
                  ? "font-semibold text-[#ff8861]"
                  : "text-gray-700"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
