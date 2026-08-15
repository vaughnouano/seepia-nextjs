import React from "react";

// global
import button from "../../button/global.module.css";
//
import styles from "../../button/TextButton/TextButton.module.css";

export default function TextButton({
  textContent,
  buttonState = "active",
  fill = false,
}) {
  return (
    <button
      className={`${button[buttonState]} ${styles.button} ${fill ? styles.fill : styles.wrap}`}
    >
      <p className={styles.text}>{textContent}</p>
    </button>
  );
}
