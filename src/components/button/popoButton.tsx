import popo from "@/assets/image/common/popo.png";
import clsx from "clsx";

interface PopoButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PopoButton: React.FC<PopoButtonProps> = ({ children, onClick = () => {}, className = "" }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-15 h-15 rounded-full bg-white shadow-custom-2 border border-gray-50",
        className
      )}
      onClick={onClick}
    >
      <img src={popo} alt="popo icon" className="w-3/4 h-3/4 object-contain" />
      {children}
    </div>
  );
};
