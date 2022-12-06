import React, { useEffect } from "react";
import { ReactPortal } from "../ReactPortal";
import styles from "./Modal.module.scss";

interface IModal {
  children: React.ReactNode;
  header?: string;
  isOpen?: boolean;
  handleClose: () => void | null;
}

export function Modal({ children, isOpen, handleClose, header }: IModal) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);
  return (
    <ReactPortal wraperId="modal_root">
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.headerContainer}>
            <h3 className={styles.heading}>{header ? header : ""}</h3>
            <button onClick={handleClose} className={styles.closeBtn}></button>
          </div>
          <div className={styles.main}>{children}</div>
        </div>
      </div>
    </ReactPortal>
  );
}
