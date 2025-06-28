// 생성하기는 무조건 디폴트 시나리오 생성 클릭하면 챗봇으로 이동 뒤로가기 누르면 저장하기 취소버튼, 수정하기 클릭하면 챗봇이동, 수정완료 하고 나가면 추가로 하나 생성, 기본버전은 남기고 삭제하고 싶으면 삭제버튼

import { useState, useRef, useEffect } from "react";
import { Modal } from "../../../components/modal/Modal";
import { SideModal } from "../../../components/modal/SideModal";
import { ChildNavBar } from "../../../components/nav-bar/ChildNavBar";
import { ChatBotHeader } from "../../../components/header/header";
import ChatMessage from "../../../features/invest/ChatMessage";
import ChatOutModal from "../../../features/invest/ChatOutModal";
import ChatTurnSideModal from "../../../features/invest/ChatTurnSideModal";
import ArrowUp from "../../../components/icons/ArrowUp";
import { editScenario } from "../../../api/invest/edit-scenario";
import { EventSourcePolyfill } from "event-source-polyfill";
import { sendChatbotMessage } from "../../../api/invest/chatbot-message";
import { useAuthStore } from "../../../zustand/auth";
import { useModalStore } from "../../../zustand/modal";
import Cookies from "js-cookie";
import theacher_popo from "../../../assets/image/common/teacher_popo.png";
import { saveScenario } from "../../../api/invest/save-scenario";
import { QueryClient } from "@tanstack/react-query";

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

// 각 주식(돼지)의 상태를 나타내는 타입
export interface Stock {
  name: string; // 돼지 이름 (예: '첫째 돼지')
  risk_level: string; // 리스크 수준 (예: '고위험 고수익')
  description: string; // 설명 (예: "지푸라기로 가장 빠르게 집을 짓습니다.")
  before_value: number; // 이전 턴의 가치
  current_value: number; // 현재 턴의 가치
  expectation: string; // 다음 턴에 대한 기대치
}

// 각 턴의 전체 상태를 나타내는 타입
export interface StoryState {
  turn_number: number; // 턴 번호
  result: string; // 이 턴의 결과 요약
  news: string; // 뉴스 내용
  news_tag: "high" | "mid" | "low" | "all" | ""; // 뉴스 영향 범위
  stocks: Stock[]; // 주식(돼지) 목록
}

export interface TurnState {
  title: string;
  result: string;
  news: string;
}

const initialTurns = [
  { title: "1", result: "", news: "" },
  { title: "2", result: "", news: "" },
  { title: "3", result: "", news: "" },
  { title: "4", result: "", news: "" },
  { title: "5", result: "", news: "" },
  { title: "6", result: "", news: "" },
  { title: "7", result: "", news: "" },
];

interface ChatMessage {
  message: string;
  isTeacher: boolean;
}

interface InvestChatBotProps {
  scenarioType: string;
  scenarioName: string;
  scenarioId: string;
  closeModal: () => void;
  turns?: TurnState[] | null;
}

const queryClient = new QueryClient();

export const InvestChatBot: React.FC<InvestChatBotProps> = ({
  scenarioType,
  scenarioName,
  scenarioId,
  closeModal,
  turns,
}) => {
  console.log("scenarioId", scenarioId);

  const { selectedChildId } = useAuthStore();
  const { openModal, closeModal: closeNavModal } = useModalStore();

  const [turnData, setTurnData] = useState<TurnState[]>(turns || initialTurns);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSend, setIsSend] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const [senarioCreateModalOpen, setSenarioCreateModalOpen] = useState(false);
  const [senarioModalOpen, setSenarioModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    if (scenarioId) {
      editScenario(scenarioId);
    }

    // SSE 연결
    const token = useAuthStore.getState().accessToken;
    const Refresh_key = Cookies.get("refreshToken");

    try {
      const eventSource = new EventSourcePolyfill(
        `${import.meta.env.VITE_API_BASE_URL}/api/chatbot/sse`,
        {
          headers: {
            "Content-Type": "text/event-stream",
            Authorization: `Bearer ${token}`,
            Refresh_key: `Bearer ${Refresh_key}`,
          },
          withCredentials: true,
        }
      );

      eventSourceRef.current = eventSource;

      eventSource.addEventListener("connect", (event: any) => {
        console.log("초기 연결 수신:", event.data); // "connected"
      });

      eventSource.addEventListener("ping", (event: any) => {
        console.log("ping", event);
      });

      // 메시지 이벤트 리스너
      eventSource.addEventListener("chatbot", (event: any) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          const story: StoryState[] = JSON.parse(data.story);
          const turns: TurnState[] = story.map((turn) => ({
            title: turn.turn_number.toString(),
            result: turn.result,
            news: turn.news,
          }));
          setTurnData(turns);
          setMessages((prev) => [
            ...prev,
            { message: data.reply, isTeacher: true },
          ]);
          setIsLoading(false);
        } catch (error) {
          console.error("메시지 파싱 에러:", error);
        }
      });

      // 에러 이벤트 리스너
      eventSource.addEventListener("error", (event) => {
        console.error("SSE 연결 에러 - 상태:", eventSource?.readyState);
        console.error("SSE 연결 에러 - URL:", eventSource?.url);
        console.error("SSE 연결 에러 - 전체 에러:", event);
        eventSource?.close();
      });

      // 연결 성공 이벤트 리스너
      eventSource.addEventListener("open", () => {
        console.log("SSE 연결 성공 - URL:", eventSource?.url);
      });
    } catch (error) {
      console.error("챗봇 초기화 중 에러 발생:", error);
    }

    // cleanup 함수
    return () => {
      if (eventSourceRef.current) {
        console.log("Cleaning up SSE connection");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [scenarioId]); // isConnected 제거하여 무한 루프 방지

  useEffect(() => {
    // 챗봇이 열릴 때 네비바 숨기기
    openModal();
    return () => {
      // 챗봇이 닫힐 때 네비바 표시
      closeNavModal();
    };
  }, []);

  const handleCloseModal = () => {
    closeModal();
    closeNavModal();
  };

  const handleSendMessage = () => {
    if (!inputRef.current?.textContent?.trim() || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { message: inputRef.current?.textContent || "", isTeacher: false },
    ]);
    sendChatbotMessage({ message: inputRef.current?.textContent || "" });
    setIsSend(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isSend) {
      inputRef.current!.textContent = "";
      setIsSend(false);
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveScenario = async () => {
    if (selectedChildId) {
      const result = await saveScenario(selectedChildId, scenarioName);
      queryClient.invalidateQueries({ queryKey: ["scenarioList"] });
      if (result) {
        closeModal();
      }
    }
  };

  return (
    <>
      {/* 챗봇 나가기 모달 */}
      <Modal
        isOpen={senarioCreateModalOpen}
        onClose={() => setSenarioCreateModalOpen(false)}
      >
        <ChatOutModal
          setSenarioCreateModalOpen={setSenarioCreateModalOpen}
          onClick={handleCloseModal}
        />
      </Modal>
      {/* 사이드바 */}
      <SideModal
        isOpen={senarioModalOpen}
        onClose={() => setSenarioModalOpen(false)}
      >
        <ChatTurnSideModal
          turns={turnData}
          scenarioColor={themes[scenarioType].color}
          selectedTheme={scenarioType}
          scenarioName={scenarioName}
          setSenarioModalOpen={setSenarioModalOpen}
          quitButtonOnClick={() => {
            handleSaveScenario();
          }}
        />
      </SideModal>
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
      <div className="absolute top-18 right-7 text-xs px-1 py-0.5 bg-white rounded-xl shadow-custom-2 border border-gray-100">
        턴
      </div>
      <ChildNavBar selectedColor={"#000000"} />
      {/* 채팅 리스트 */}
      <div className="flex flex-col gap-y-3 overflow-y-auto h-[calc(100vh-20.5rem)]">
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
            message={
              "안녕하세요  포포 교수님입니다. 첫 메시지와 함께 수정된 오른쪽 위 턴 정보를 확인하세요!"
            }
            isTeacher={true}
            parentChatColor={themes[scenarioType].color}
          />
        )}
        {isLoading && (
          <div className="flex flex-col gap-y-1">
            <div className="flex">
              <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main-white-500 border border-gray-100 shadow-custom-2">
                <img
                  src={theacher_popo}
                  alt={"포포 교수님"}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
              <div className="text-sm py-2.5 px-2">포포 교수님</div>
            </div>
            <div className="flex space-x-1 ml-10 mt-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
            </div>
          </div>
        )}
      </div>
      {/* 채팅 입력 */}
      <div className="absolute flex flex-col-reverse bottom-6 left-8 w-[calc(100%-4rem)] px-4 pt-4 pb-11 bg-main-white-500 rounded-xl shadow-custom-2 border border-gray-100">
        <div
          ref={inputRef}
          className="overflow-y-auto focus:outline-none text-base"
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
