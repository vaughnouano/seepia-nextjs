import React from "react";

// global
import button from "../../button/global.module.css";
//
import styles from "../../button/TextButton/TextButton.module.css";

export default function TextButton({
  textContent,
  buttonState = "active",
  fill = false,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${button[buttonState]} ${styles.button} ${fill ? styles.fill : styles.wrap}`}
    >
      <p className={styles.text}>{textContent}</p>
    </button>
  );
}
