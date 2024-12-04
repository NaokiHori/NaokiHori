import React, { JSX } from "react";
import { CloseButton } from "./CloseButton";
import * as style from "./style.css";

export interface ModalHandler {
  ref: React.RefObject<HTMLDialogElement> | null;
  open: () => void;
  close: () => void;
}

export function useModal({
  handleClose,
}: {
  handleClose: () => void;
}): ModalHandler {
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
    open: open,
    close: close,
  };
}

export function Modal({
  modalHandler,
  children,
}: {
  modalHandler: ModalHandler;
  children: React.ReactNode;
}): JSX.Element {
  const ref: React.RefObject<HTMLDialogElement> | null = modalHandler.ref;
  return (
    <dialog className={style.modal} ref={ref}>
      <CloseButton
        handleClick={() => {
          modalHandler.close();
        }}
      />
      {children}
    </dialog>
  );
}
