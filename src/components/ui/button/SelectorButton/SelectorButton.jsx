// global css
import button from "../../button/global.module.css";
//
import styles from "../SelectorButton/SelectorButton.module.css";

export default function SelectorButton({
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
