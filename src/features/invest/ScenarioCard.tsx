import { EditIcon } from "../../components/icons/EditIcon";
import { DropdownMenu } from "./DropdownMenu";

export const ScenarioCard = ({
  name,
  scenarioId,
  summary,
  updatedAt,
  buttonColor,
  handleDropdownToggle,
  handleEdit,
  handleView,
  handleDelete,
  openDropdowns,
}: {
  name: string;
  scenarioId: string;
  buttonColor: string;
  summary: string;
  updatedAt: string;
  handleDropdownToggle: (scenarioId: string) => void;
  handleEdit: (scenarioName: string, scenarioId: string) => void;
  handleView: (scenarioId: string) => void;
  handleDelete: (scenarioId: string) => void;
  openDropdowns: Record<string, boolean>;
}) => {
  return (
    <div key={name} className="px-6 py-5 border border-gray-100 rounded-xl shadow-md ">
      {/* 시나리오 리스트 제목 */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-base font-medium">{name}</div>
        <div className="relative">
          <button
            className="text-sm text-white p-1 rounded-sm flex items-center gap-x-1"
            style={{ backgroundColor: buttonColor }}
            onClick={() => handleDropdownToggle(scenarioId)}
          >
            <EditIcon width={16} height={16} />
          </button>
          <DropdownMenu
            isOpen={openDropdowns[scenarioId] || false}
            onClose={() => handleDropdownToggle(scenarioId)}
            onView={() => handleView(scenarioId)}
            onEdit={() => handleEdit(name, scenarioId)}
            onDelete={() => handleDelete(scenarioId)}
          />
        </div>
      </div>
      {/* 시나리오 리스트 내용 */}
      <div className="text-sm text-gray-600 mb-4">{summary}</div>
      {/* 시나리오 태그, 수정, 생성 날짜 */}
      <div className="flex mt-4">
        {/* <div className="flex gap-x-1">
          <div className="text-xs bg-gray-100 text-gray-500 p-1 rounded-sm">#태그</div>
          <div className="text-xs bg-gray-100 text-gray-500 p-1 rounded-sm">#태그</div>
        </div> */}
        <div className="text-xs text-gray-500 ml-auto">{updatedAt}</div>
      </div>
    </div>
  );
};
