import { useAuthStore } from "../../zustand/auth";
import { useEffect, useRef } from "react";

interface ChildNavBarProps {
  selectedColor?: string;
}

export const ChildNavBar: React.FC<ChildNavBarProps> = ({
  selectedColor = "#000000",
}) => {
  const { child, selectedChildId, setSelectedChildId } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedButtonRef.current && containerRef.current) {
      const container = containerRef.current;
      const button = selectedButtonRef.current;

      // 선택된 버튼의 위치로 스크롤
      const scrollLeft =
        button.offsetLeft - (container.offsetWidth - button.offsetWidth) / 2;
      container.scrollTo({ left: scrollLeft });
    }
  }, [selectedChildId]);

  if (child.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="flex justify-between gap-x-1 mb-8 bg-gray-100 rounded-xl p-1 overflow-x-auto scrollbar-hidden"
    >
      {child.length > 0 &&
        child.map((_child) => (
          <button
            key={_child.userId}
            ref={selectedChildId === _child.userId ? selectedButtonRef : null}
            className={`flex-1 py-1 px-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
              selectedChildId === _child.userId ? "bg-white shadow " : ""
            }`}
            style={{
              color:
                selectedChildId === _child.userId
                  ? `${selectedColor}`
                  : "#99a1af",
            }}
            onClick={() => setSelectedChildId(_child.userId)}
          >
            {_child.name}
          </button>
        ))}
    </div>
  );
};
