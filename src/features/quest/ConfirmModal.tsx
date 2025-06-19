import { Modal } from "../../components/modal/Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="relative bg-white px-[2rem] pt-[2.3rem] pb-[1.5rem] rounded-2xl text-center shadow-lg border-[0.2rem] border-[#ff8442]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[#5e4632] font-bold text-[1rem]">
          확인 요청을 승인하시겠습니까?
        </p>

        <div className="flex justify-center gap-4 mt-[1.5rem]">
          <button
            className="bg-yellow-300 text-[#5e4632] px-[1rem] py-[0.3rem] rounded-lg shadow cursor-pointer 
             transition duration-150 ease-in-out active:scale-95"
            onClick={onConfirm}
          >
            확인
          </button>

          <button
            className="bg-gray-200 text-[#5e4632] px-[1rem] py-[0.3rem]  rounded-lg shadow cursor-pointer
             transition duration-150 ease-in-out active:scale-95"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};
