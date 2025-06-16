// 생성하기는 무조건 디폴트 시나리오 생성 클릭하면 챗봇으로 이동 뒤로가기 누르면 저장하기 취소버튼, 수정하기 클릭하면 챗봇이동, 수정완료 하고 나가면 추가로 하나 생성, 기본버전은 남기고 삭제하고 싶으면 삭제버튼

import { useState, useRef, useEffect } from "react";
import { Modal } from "../../../components/modal/Modal";
import { SideModal } from "../../../components/modal/SideModal";
import { ChildNavBar } from "../../../components/nav-bar/ChildNavBar";
import { ChatBotHeader } from "../../../components/header/header";
import ChatMessage from "../../../features/invest/ChatMessage";
import ChatOutModal from "../../../features/invest/ChatOutModal";
import ChatTurnSideModal from "../../../features/invest/ChatTurnSideModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowUp from "../../../components/icons/ArrowUp";
import { connectChatBot } from "../../../api/invest/connect-chat-bot";
import { editScenario } from "../../../api/invest/edit-scenario";

interface Theme {
  id: string;
  name: string;
  color: string;
}

const themes: Record<string, Theme> = {
  "아기돼지 삼형제": {
    id: "1",
    name: "아기돼지 삼형제",
    color: "#1DB3FB",
  },
  "푸드 트럭 왕국": {
    id: "2",
    name: "푸드 트럭 왕국",
    color: "#78D335",
  },
  "마법 왕국": {
    id: "3",
    name: "마법 왕국",
    color: "#C57CF0",
  },
  "달빛 도둑": {
    id: "4",
    name: "달빛 도둑",
    color: "#FE4A4E",
  },
};

// const scenarioNames = {
//   "아기돼지 삼형제": ["아기돼지1", "아기돼지2", "아기돼지3"],
//   "푸드 트럭 왕국": ["푸드트럭1", "푸드트럭2", "푸드트럭3"],
//   "마법 왕국": ["마법왕국1", "마법왕국2", "마법왕국3"],
//   "달빛 도둑": ["달빛도둑1", "달빛도둑2", "달빛도둑3"],
// };

const turns = [
  {
    title: "1턴",
    content:
      "1턴의 상세 내용입니다. 1턴의 상세 내용입니다.1턴의 상세 내용입니다.1턴의 상세 내용입니다.1턴의 상세 내용입니다.1턴의 상세 내용입니다.1턴의 상세 내용입니다.",
  },
  { title: "2턴", content: "2턴의 상세 내용입니다." },
  { title: "3턴", content: "3턴의 상세 내용입니다." },
  { title: "4턴", content: "4턴의 상세 내용입니다." },
  { title: "5턴", content: "5턴의 상세 내용입니다." },
  { title: "6턴", content: "6턴의 상세 내용입니다." },
  { title: "7턴", content: "7턴의 상세 내용입니다." },
  { title: "8턴", content: "8턴의 상세 내용입니다." },
  { title: "9턴", content: "9턴의 상세 내용입니다." },
  { title: "10턴", content: "10턴의 상세 내용입니다." },
];

interface ChatMessage {
  message: string;
  isTeacher: boolean;
}

export const InvestChatBotPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scenarioType = searchParams.get("scenarioType") || "";
  const scenarioName = searchParams.get("scenarioName");
  const scenarioId = searchParams.get("scenarioId");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let eventSource: EventSource | null | undefined = null;

    const initializeChatBot = async () => {
      try {
        // API 호출
        if (scenarioId) {
          await editScenario(scenarioId);
        }

        // SSE 연결
        eventSource = connectChatBot((data) => {
          // 선생님 메시지
          setMessages([{ message: data, isTeacher: true }]);
        });
      } catch (error) {
        console.error("챗봇 초기화 중 에러 발생:", error);
      }
    };

    initializeChatBot();

    // cleanup 함수
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const [senarioCreateModalOpen, setSenarioCreateModalOpen] = useState(false);
  const [senarioModalOpen, setSenarioModalOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputRef.current?.textContent?.trim()) return;

    // 사용자 메시지 추가
    Promise.resolve(
      setMessages((prev) => [...prev, { message: inputRef.current?.textContent || "", isTeacher: false }])
    ).then(() => {
      inputRef.current!.textContent = "";
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* 시나리오 종류 */}
      <Modal isOpen={senarioCreateModalOpen} onClose={() => setSenarioCreateModalOpen(false)}>
        <ChatOutModal setSenarioCreateModalOpen={setSenarioCreateModalOpen} />
      </Modal>
      <SideModal isOpen={senarioModalOpen} onClose={() => setSenarioModalOpen(false)}>
        <ChatTurnSideModal
          turns={turns}
          scenarioColor={themes[scenarioType].color}
          selectedTheme={scenarioType}
          scenarioName={scenarioName || ""}
          setSenarioModalOpen={setSenarioModalOpen}
          quitButtonOnClick={() => {
            navigate("/invest/scenario-select");
          }}
        />
      </SideModal>
      <>
        {/* 헤더 */}
        <ChatBotHeader
          title={`${scenarioName}`}
          onClick={() => {}}
          backButtonOnClick={() => {
            setSenarioCreateModalOpen(true);
          }}
          noteButtonOnClick={() => {
            setSenarioModalOpen(true);
          }}
        />
        <div className="absolute top-18 right-7 text-[0.625rem] px-1 py-0.5 bg-white rounded-xl shadow-custom-2 border border-gray-100">
          턴
        </div>
        <ChildNavBar selectedColor={"#000000"} />
      </>
      {/* 채팅 리스트 */}
      <div className="flex flex-col gap-y-3 overflow-y-auto h-[calc(100vh-20.5rem)]" ref={chatContainerRef}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.message}
              isTeacher={msg.isTeacher}
              parentChatColor={themes[scenarioType].color}
            />
          ))
        ) : (
          <ChatMessage
            key={"첫 메세지"}
            message={"안녕하세요  포포 교수님입니다. 첫 메시지와 함께 수정된 오른쪽 위 턴 정보를 확인하세요!"}
            isTeacher={true}
            parentChatColor={themes[scenarioType].color}
          />
        )}
      </div>
      {/* 채팅 입력 */}
      <div className="absolute flex flex-col-reverse bottom-6 left-8 w-[calc(100%-4rem)] px-4 pt-4 pb-11 bg-main-white-500 rounded-xl shadow-custom-2 border border-gray-100">
        <div
          ref={inputRef}
          className="overflow-y-auto focus:outline-none text-xs"
          contentEditable
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          className="bg-black absolute flex justify-center items-center bottom-2 right-2 w-6 h-6 object-contain rounded-full"
        >
          <ArrowUp width={16} height={16} fill="white" />
        </button>
      </div>
    </>
  );
};
