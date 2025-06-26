import { useEffect, useState } from "react";
import { Modal } from "../../../components/modal/Modal";
import { SideModal } from "../../../components/modal/SideModal";
import { useNavigate } from "react-router-dom";
import { ScenarioCreateModal } from "../../../features/invest/scenarioCreateModal";
import { TurnSideModal } from "../../../features/invest/TurnSideModal";
import { ScenarioCard } from "../../../features/invest/ScenarioCard";
import ThemeSelector from "../../../features/invest/ThemeSelector";
import { getScenarioList, type ScenarioItem } from "../../../api/invest/scenario-list";
import { useAuthStore } from "../../../zustand/auth";
import { formatDate } from "../../../utils/DateFormatting";
import { deleteScenario } from "../../../api/invest/delete-scenario";
import { InvestChatBot, type StoryState, type TurnState } from "./ChatBot";
import Pagination from "../../../components/page/Pagination";
import { Header } from "../../../components/header/header";
import { ChildNavBar } from "../../../components/nav-bar/ChildNavBar";

interface Theme {
  id: string;
  name: string;
  color: string;
  chapterId: string;
}

const themes: Record<string, Theme> = {
  "아기돼지 삼형제": {
    id: "1",
    name: "아기돼지 삼형제",
    color: "#1DB3FB",
    chapterId: "1111",
  },
  "푸드 트럭 왕국": {
    id: "2",
    name: "푸드 트럭 왕국",
    color: "#78D335",
    chapterId: "2222",
  },
  "마법 왕국": {
    id: "3",
    name: "마법 왕국",
    color: "#C57CF0",
    chapterId: "3333",
  },
  "달빛 도둑": {
    id: "4",
    name: "달빛 도둑",
    color: "#FE4A4E",
    chapterId: "4444",
  },
};

const DEFAULT_SCENARIO_ID = {
  "아기돼지 삼형제": "a2be0f02-14c4-4a10-9c49-cbbac74bee08",
  "푸드 트럭 왕국": "e7f634f8-3a4a-433d-9a3d-b945da07e777",
  "마법 왕국": "816cfeef-3b9e-48c3-90f0-70a31cd67d4e",
  "달빛 도둑": "07e47c9d-4f9f-46b1-97f4-358bf3144909",
};

export const InvestScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  // 선택된 자녀
  const { selectedChildId } = useAuthStore();
  // 선택된 테마
  const [selectedTheme, setSelectedTheme] = useState(themes["아기돼지 삼형제"].name);
  // 시나리오 리스트
  const [scenarioList, setScenarioList] = useState<ScenarioItem[]>([]);
  // 선택된 시나리오 ID
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  // 시나리오 생성 모달
  const [senarioCreateModalOpen, setSenarioCreateModalOpen] = useState(false);
  // 시나리오 이름
  const [scenarioName, setScenarioName] = useState("");
  // 시나리오 조회 모달
  const [senarioModalOpen, setSenarioModalOpen] = useState(false);
  // 삭제 모달
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // 챗봇 모달
  const [chatBotOpen, setChatBotOpen] = useState(false);
  // 드롭다운 메뉴 상태 관리
  const [openDropdowns, setOpenDropdowns] = useState<{ [scenarioId: string]: boolean }>({});
  // 컴포넌트 내부
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleDropdownToggle = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setOpenDropdowns((prev) => ({ ...prev, [scenarioId]: !prev[scenarioId] }));
  };

  useEffect(() => {
    if (selectedChildId) {
      getScenarioList(currentPage - 1, 5, selectedChildId, themes[selectedTheme].chapterId).then((data) => {
        setScenarioList(data.scenarioList);
        setTotalPages(Number(data.totalPageSize));
        setOpenDropdowns(
          data.scenarioList.reduce((acc, scenario) => {
            acc[scenario.scenarioId] = false;
            return acc;
          }, {} as { [key: string]: boolean })
        );
      });
    }
  }, [selectedChildId, selectedTheme, currentPage]);

  // 자녀가 바뀌면 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
    setSelectedTheme(themes["아기돼지 삼형제"].name);
  }, [selectedChildId]);

  // 테마가 바뀌면 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTheme]);

  const handleThemeSelect = (themeName: string) => {
    setSelectedTheme(themeName);
  };

  const handleEdit = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setChatBotOpen(true);
  };

  const handleView = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setSenarioModalOpen(true);
  };

  const handleDelete = (scenarioId: string) => {
    deleteScenario(scenarioId).then((result) => {
      if (result) {
        console.log("삭제 성공");
      }
    });
  };

  const parseTurns = (story: string | undefined) => {
    if (!story) return null;
    const storyData: StoryState[] = JSON.parse(story);
    const turns: TurnState[] = storyData.map((turn) => ({
      title: turn.turn_number.toString(),
      result: turn.result,
      news: turn.news,
    }));
    return turns;
  };

  if (chatBotOpen) {
    return (
      <InvestChatBot
        scenarioType={selectedTheme}
        scenarioName={scenarioName}
        scenarioId={selectedScenarioId || ""}
        closeModal={() => setChatBotOpen(false)}
        turns={
          scenarioList.find((scenario) => scenario.scenarioId === selectedScenarioId)?.story
            ? parseTurns(scenarioList.find((scenario) => scenario.scenarioId === selectedScenarioId)?.story)
            : null
        }
      />
    );
  } else
    return (
      <>
        <Modal isOpen={senarioCreateModalOpen} onClose={() => setSenarioCreateModalOpen(false)}>
          <ScenarioCreateModal
            scenarioId={DEFAULT_SCENARIO_ID[selectedTheme as keyof typeof DEFAULT_SCENARIO_ID] || ""}
            selectedTheme={selectedTheme}
            setSenarioCreateModalOpen={setSenarioCreateModalOpen}
            chatbotOpen={() => {
              setChatBotOpen(true);
            }}
            setSelectedScenarioId={setSelectedScenarioId}
            scenarioName={scenarioName}
            setScenarioName={setScenarioName}
          />
        </Modal>
        <SideModal isOpen={senarioModalOpen} onClose={() => setSenarioModalOpen(false)}>
          <TurnSideModal
            turns={parseTurns(scenarioList.find((scenario) => scenario.scenarioId === selectedScenarioId)?.story) || []}
            scenarioColor={themes[selectedTheme].color}
            selectedTheme={selectedTheme}
            scenarioName={`${
              scenarioList.findIndex((scenario) => scenario.scenarioId === selectedScenarioId) + 1
            }번 시나리오`}
            setSenarioModalOpen={setSenarioModalOpen}
          />
        </SideModal>
        <Header title={"시나리오 선택"} onClick={() => {}} backButtonOnClick={() => navigate("/")}></Header>
        <ChildNavBar selectedColor={"#000000"} />
        <div className="text-sm mb-2">시나리오 종류</div>
        <div className="flex gap-x-3.5 pb-2 mb-6 overflow-x-auto scrollbar-hidden">
          {Object.values(themes).map((theme) => (
            <ThemeSelector
              key={theme.id}
              bgColor={theme.color}
              name={theme.name}
              onClick={() => handleThemeSelect(theme.name)}
            />
          ))}
        </div>
        <div className="flex justify-between mb-8">
          <div className="text-sm">시나리오</div>
          <div
            className="text-xs px-2 py-1 rounded-sm border border-gray-100 shadow-sm active:scale-95 transition-all duration-100"
            onClick={() => {
              setSenarioCreateModalOpen(true);
              setSelectedScenarioId(DEFAULT_SCENARIO_ID[selectedTheme as keyof typeof DEFAULT_SCENARIO_ID] || "");
            }}
          >
            시나리오 생성
          </div>
        </div>

        <div className="flex flex-col gap-y-6 mb-6">
          {scenarioList.length > 0 &&
            scenarioList.map((scenario) => {
              return (
                <ScenarioCard
                  key={scenario.scenarioId}
                  name={scenario.scenarioName}
                  summary={scenario.summary}
                  scenarioId={scenario.scenarioId}
                  buttonColor={themes[selectedTheme].color}
                  updatedAt={formatDate(scenario.updatedAt)}
                  handleDropdownToggle={handleDropdownToggle}
                  handleEdit={handleEdit}
                  handleView={handleView}
                  handleDelete={handleDelete}
                  openDropdowns={openDropdowns}
                />
              );
            })}
          {/* 페이지네이션 */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </>
    );
};
