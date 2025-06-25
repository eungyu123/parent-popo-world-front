import React from "react";
import theacher_popo from "../../assets/image/common/teacher_popo.png";
import clsx from "clsx";

interface ChatMessageProps {
  message: string;
  isTeacher: boolean;
  parentChatColor: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTeacher, parentChatColor }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className={clsx("flex", isTeacher ? "" : "self-end")}>
        {isTeacher ? (
          <>
            <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main-white-500 border border-gray-100 shadow-custom-2">
              <img src={theacher_popo} alt={"포포 교수님"} className="w-4/5 h-4/5 object-contain" />
            </div>
            <div className="text-sm py-2.5 px-2">포포 교수님</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div
        className={clsx("w-fit  rounded-lg text-sm p-2", isTeacher ? "ml-8 mr-20" : "text-white  mr-4 ml-20 self-end")}
        style={{ backgroundColor: isTeacher ? "#FAF8F9" : parentChatColor }}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
