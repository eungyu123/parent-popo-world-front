export const ScenarioCreateModal = ({
  scenarioId,
  selectedTheme,
  setSenarioCreateModalOpen,
  chatbotOpen,
  setSelectedScenarioId,
  scenarioName,
  setScenarioName,
}: {
  scenarioId: string;
  selectedTheme: string;
  setSenarioCreateModalOpen: (open: boolean) => void;
  chatbotOpen: () => void;
  setSelectedScenarioId: (id: string) => void;
  scenarioName: string;
  setScenarioName: (name: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-y-4 bg-white rounded-lg p-6 w-[320px]" onClick={(e) => e.stopPropagation()}>
      <div className="text-sm font-bold">시나리오 생성</div>

      <div className="flex flex-col gap-y-2">
        <div className="text-xs text-gray-900">시나리오 종류</div>
        <div className="px-3 py-2 bg-gray-100 rounded text-xs">{selectedTheme}</div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="text-xs text-gray-900">시나리오 이름</div>
        <input
          value={scenarioName}
          onChange={(e) => setScenarioName(e.target.value)}
          type="text"
          placeholder="시나리오 이름을 입력하세요"
          className="px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:border-gray-900"
        />
      </div>

      <div className="flex gap-x-2 mt-2 justify-end">
        <button
          className="px-4 py-2 text-xs text-white bg-gray-900 rounded hover:bg-gray-800"
          onClick={() => {
            setSenarioCreateModalOpen(false);
            setSelectedScenarioId(scenarioId);
            chatbotOpen();
          }}
        >
          생성
        </button>
        <button
          onClick={() => {
            setSenarioCreateModalOpen(false);
          }}
          className=" px-4 py-2 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          취소
        </button>
      </div>
    </div>
  );
};
