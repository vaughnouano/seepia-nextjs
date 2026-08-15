import React from "react";

// global
import button from "../global.module.css";
//
import styles from "../IconButton/IconButton.module.css";

export default function IconButton({
  iconContent,
  buttonState = "active",
  fill = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${button[buttonState]} ${styles.button} ${fill ? styles.fill : styles.wrap}`}
    >
      {iconContent}
    </button>
  );
}
