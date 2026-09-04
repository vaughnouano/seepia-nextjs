// global css
import button from "../global.module.css";
//
import styles from "../PriceButton/PriceButton.module.css";

// icons
import PesoSign from "../../../icons/PesoSign";

export default function PriceButton({
  textContent,
  buttonState = "active",
  fill = false,

  // PriceButton specifics
  priceValue,
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
      <div className={styles.price_container}>
        <p className={styles.price}>
          <PesoSign />
          {priceValue}
        </p>
        <p className={styles.priceLabel}>Per Day</p>
      </div>
    </button>
  );
}
