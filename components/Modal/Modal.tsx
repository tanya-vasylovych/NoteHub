"use client";
import { Modal as MuiModal } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalProps) => {
  const router = useRouter();
  const close = () => router.back();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <MuiModal
      open={true}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{
        onClick: handleBackdropClick,
      }}
    >
      <div className={css.modal}>
        {children}
        <button onClick={close} className={css.close}>
          Close
        </button>
      </div>
    </MuiModal>
  );
};

export default Modal;
