import { useEffect, useState } from "react";
import { Modal } from "../../../components/modal/Modal";
import { SideModal } from "../../../components/modal/SideModal";

import { useNavigate } from "react-router-dom";
import { ScenarioCreateModal } from "../../../features/invest/scenarioCreateModal";
import { TurnSideModal } from "../../../features/invest/TurnSideModal";
import { ScenarioCard } from "../../../features/invest/ScenarioCard";
import Pagination from "../../../features/invest/Pagination";
import ThemeSelector from "../../../features/invest/ThemeSelector";
import { getScenarioList, type PaginatedResponse, type ScenarioItem } from "../../../api/invest/scenario-list";

// const colors = ["#1DB3FB", "#78D335", "#C57CF0", "#FE4A4E", "#FFBE00", "#FEE0DF"];

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

const scenarioNames = {
  "아기돼지 삼형제": ["아기돼지1", "아기돼지2", "아기돼지3", "아기돼지4", "아기돼지5"],
  "푸드 트럭 왕국": ["푸드트럭1", "푸드트럭2", "푸드트럭3"],
  "마법 왕국": ["마법왕국1", "마법왕국2", "마법왕국3"],
  "달빛 도둑": ["달빛도둑1", "달빛도둑2", "달빛도둑3"],
};

export const InvestScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof scenarioNames>(
    themes["아기돼지 삼형제"].name as keyof typeof scenarioNames
  );

  // 드롭다운 메뉴 상태 관리
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  // 컴포넌트 내부
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [scenarioList, setScenarioList] = useState<PaginatedResponse<ScenarioItem>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
  });

  useEffect(() => {
    getScenarioList(currentPage, 5).then((data) => {
      console.log("data", data);
      setScenarioList(data);
    });
  }, [currentPage]);

  const [senarioCreateModalOpen, setSenarioCreateModalOpen] = useState(false);
  const [senarioModalOpen, setSenarioModalOpen] = useState(false);
  const [openTurn, setOpenTurn] = useState<{ [key: string]: boolean }>({
    "1턴": false,
    "2턴": false,
    "3턴": false,
    "4턴": false,
    "5턴": false,
    "6턴": false,
    "7턴": false,
    "8턴": false,
    "9턴": false,
    "10턴": false,
  });

  const handleDropdownToggle = (scenarioName: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [scenarioName]: !prev[scenarioName],
    }));
  };

  const handleEdit = (scenarioName: string) => {
    // TODO: 수정 로직 구현
    navigate(`/invest/chat-bot?scenarioType=${selectedTheme}&scenarioName=${scenarioName}`);
  };

  const handleDelete = (scenarioName: string) => {
    // TODO: 삭제 로직 구현
    console.log("Delete scenario:", scenarioName);
  };

  const handleView = (scenarioName: string) => {
    // TODO: 조회 로직 구현
    console.log(scenarioName);
    setSenarioModalOpen(true);
  };

  const handleThemeSelect = (themeName: string, firstScenario: string) => {
    console.log(themeName, firstScenario);
    setSelectedTheme(themeName as keyof typeof scenarioNames);
  };

  return (
    <>
      {/* 시나리오 종류 */}
      <Modal isOpen={senarioCreateModalOpen} onClose={() => setSenarioCreateModalOpen(false)}>
        <ScenarioCreateModal selectedTheme={selectedTheme} setSenarioCreateModalOpen={setSenarioCreateModalOpen} />
      </Modal>
      <SideModal isOpen={senarioModalOpen} onClose={() => setSenarioModalOpen(false)}>
        <TurnSideModal
          selectedTheme={selectedTheme}
          setSenarioModalOpen={setSenarioModalOpen}
          openTurn={openTurn}
          setOpenTurn={setOpenTurn}
        />
      </SideModal>
      {/* 시나리오 종류, 선택*/}
      <div className="text-sm mb-2">시나리오 종류</div>
      <div className="flex gap-x-3.5 pb-2 mb-6  overflow-x-auto scrollbar-hidden">
        {Object.values(themes).map((theme) => (
          <ThemeSelector
            key={theme.id}
            bgColor={theme.color}
            name={theme.name}
            onClick={() => handleThemeSelect(theme.name, scenarioNames[theme.name as keyof typeof scenarioNames][0])}
          />
        ))}
      </div>

      {/* 시나리오, 시나리오 생성 */}
      <div className="flex justify-between mb-8">
        <div className="text-sm">시나리오</div>
        <div
          className="text-xs px-2 py-1 rounded-sm border border-gray-100 shadow-sm active:scale-95 transition-all duration-100"
          onClick={() => setSenarioCreateModalOpen(true)}
        >
          시나리오 생성
        </div>
      </div>

      {/* 시나리오 리스트 */}
      <div className="flex flex-col gap-y-6 mb-6">
        {scenarioNames[selectedTheme as keyof typeof scenarioNames].map((name) => (
          <ScenarioCard
            name={name}
            buttonColor={themes[selectedTheme as keyof typeof scenarioNames].color}
            handleDropdownToggle={handleDropdownToggle}
            handleEdit={handleEdit}
            handleView={handleView}
            handleDelete={handleDelete}
            openDropdowns={openDropdowns}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};
