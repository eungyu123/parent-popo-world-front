import { useEffect } from "react";
import { useModalStore } from "../../zustand/modal";
import { ModalPortal } from "./ModalPortal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      openModal();
      document.body.style.overflow = "hidden";
    } else {
      closeModal();
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      closeModal();
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 font-SpoqaHanSansNeo"
        onClick={onClose}
      >
        {/* Modal Content */}
        {children}
      </div>
    </ModalPortal>
  );
};
