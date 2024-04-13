import React, { JSX } from "react";
import { CloseButton } from "./CloseButton";
import * as style from "./style.css";

export interface ModalState {
  ref: React.RefObject<HTMLDialogElement> | null;
  openModal: () => void;
  closeModal: () => void;
}

export function useModal(handleClose: () => void): ModalState {
  const ref: React.RefObject<HTMLDialogElement> | null =
    React.useRef<HTMLDialogElement>(null);
  const open = (): void => {
    ref.current?.showModal();
  };
  const close = (): void => {
    handleClose();
    ref.current?.close();
  };
  return {
    ref,
    openModal: open,
    closeModal: close,
  };
}

export function Modal({
  modalState,
  children,
}: {
  modalState: ModalState;
  children: React.ReactNode;
}): JSX.Element {
  const ref: React.RefObject<HTMLDialogElement> | null = modalState.ref;
  return (
    <dialog className={style.modal} ref={ref}>
      <CloseButton
        onClick={() => {
          modalState.closeModal();
        }}
      />
      {children}
    </dialog>
  );
}
