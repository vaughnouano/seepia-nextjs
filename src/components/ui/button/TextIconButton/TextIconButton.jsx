import React from "react";

// global css
import button from "../global.module.css";
//
import styles from "../TextIconButton/TextIconButton.module.css";

// icons
import HeartIcon from "../../../icons/HeartIcon";

export default function TextIconButton({
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
      <span>
        <HeartIcon dark={buttonState !== "active"} />
      </span>
    </button>
  );
}
