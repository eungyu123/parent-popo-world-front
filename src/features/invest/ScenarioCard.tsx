import { EditIcon } from "../../components/icons/EditIcon";
import { DropdownMenu } from "./DropdownMenu";

export const ScenarioCard = ({
  name,
  id,
  updatedAt,
  buttonColor,
  handleDropdownToggle,
  handleEdit,
  handleView,
  handleDelete,
  openDropdowns,
}: {
  name: string;
  id: string;
  buttonColor: string;
  updatedAt: string;
  handleDropdownToggle: (id: string) => void;
  handleEdit: (id: string) => void;
  handleView: (id: string) => void;
  handleDelete: (id: string) => void;
  openDropdowns: Record<string, boolean>;
}) => {
  return (
    <div key={name} className="px-6 py-5 border border-gray-100 rounded-xl shadow-md ">
      {/* 시나리오 리스트 제목 */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">{name}</div>
        <div className="relative">
          <button
            className="text-xs text-white p-1 rounded-sm flex items-center gap-x-1"
            style={{ backgroundColor: buttonColor }}
            onClick={() => handleDropdownToggle(name)}
          >
            <EditIcon />
          </button>
          <DropdownMenu
            isOpen={openDropdowns[id] || false}
            onClose={() => handleDropdownToggle(id)}
            onView={() => handleView(id)}
            onEdit={() => handleEdit(id)}
            onDelete={() => handleDelete(id)}
          />
        </div>
      </div>
      {/* 시나리오 리스트 내용 */}
      <div className="text-xs text-gray-600 mb-4">
        시나리오 내용 요약시나리오 내용 요약시나리오 내용 요약시나리오 내용 요약 시나리오 내용 요약시나리오 내용
      </div>
      {/* 시나리오 태그, 수정, 생성 날짜 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-x-1">
          <div className="text-[0.7rem] bg-gray-100 text-gray-500 p-1 rounded-sm">#태그</div>
          <div className="text-[0.7rem] bg-gray-100 text-gray-500 p-1 rounded-sm">#태그</div>
        </div>
        <div className="text-[0.7rem] text-gray-500">{updatedAt}</div>
      </div>
    </div>
  );
};
