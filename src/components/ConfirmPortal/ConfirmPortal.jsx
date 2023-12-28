import React from "react";
import { createPortal } from "react-dom";
import "./styles.css";
const root = document.getElementById("root");

export default function ConfirmPortal({ visible, ok, cancel }) {
  const handleOk = () => {
    ok();
  };

  const handleCancel = () => {
    cancel();
  };
  return createPortal(
    <div
      className={styles.modalRoot}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.confirm}>
          <p className={styles.title}>Are you sure?</p>
          <button onClick={handleOk}>OK</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>,
    root
  );
}
