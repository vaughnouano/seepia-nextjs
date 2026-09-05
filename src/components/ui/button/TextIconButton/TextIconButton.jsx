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
}) {
  return (
    <button
      className={`${button[buttonState]} ${styles.button} ${fill ? styles.fill : styles.wrap}`}
    >
      <p className={styles.text}>{textContent}</p>
      <span>
        <HeartIcon dark={buttonState !== "active"} />
      </span>
    </button>
  );
}
