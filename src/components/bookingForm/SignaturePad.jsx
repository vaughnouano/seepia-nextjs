"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./SignaturePad.module.css";

export default function SignaturePad({ onChange }) {
  const padRef = useRef(null);

  function handleEnd() {
    if (padRef.current.isEmpty()) {
      onChange("");
      return;
    }
    const dataUrl = padRef.current.getTrimmedCanvas().toDataURL("image/png");
    onChange(dataUrl);
  }

  function handleClear() {
    padRef.current.clear();
    onChange("");
  }

  return (
    <div className={styles.wrapper}>
      <SignatureCanvas
        ref={padRef}
        penColor="black"
        canvasProps={{ className: styles.canvas }}
        onEnd={handleEnd}
      />
      <button
        type="button"
        className={styles.clearButton}
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
}
