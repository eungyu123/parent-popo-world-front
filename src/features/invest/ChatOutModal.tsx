export default function ChatOutModal({
  setSenarioCreateModalOpen,
  onClick,
}: {
  setSenarioCreateModalOpen: (open: boolean) => void;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-y-4 bg-white rounded-lg p-6 w-[320px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col gap-y-2">
        <div className="text-sm font-medium">정말 나가시겠습니까?</div>
        <div className="text-xs text-gray-600">지금 나가시면 저장되지 않습니다.</div>
      </div>
      <div className="flex gap-x-2 mt-2 ml-auto">
        <button
          onClick={() => {
            // TODO: 시나리오 생성 로직
            setSenarioCreateModalOpen(false);
            onClick();
          }}
          className=" px-4 py-2 text-xs text-white bg-gray-900 rounded hover:bg-gray-800"
        >
          나가기
        </button>
        <button
          onClick={() => setSenarioCreateModalOpen(false)}
          className=" px-4 py-2 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          취소
        </button>
      </div>
    </div>
  );
}
