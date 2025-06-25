import plusIcon from "@/assets/image/common/add-icon.png";
import clsx from "clsx";

interface AddButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({ text, onClick, className }) => {
  return (
    <div
      className={clsx(
        "flex py-5 w-full bg-white/75 justify-center items-center  text-[1.05rem] rounded-xl active:scale-95 transition-all duration-100",
        className
      )}
      onClick={onClick}
    >
      {text}
      <img src={plusIcon} alt="plus icon" className="w-6.5 h-6.5 ml-1" />
    </div>
  );
};
