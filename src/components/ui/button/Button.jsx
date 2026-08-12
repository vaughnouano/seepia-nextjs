import React from "react";
import styles from "../button/button.module.css";

import PesoSign from "../../icons/PesoSign";

export default function Button({
  children,
  icon,
  price = 0,
  variant = "action",
  visualState = "active",
}) {
  return (
    <>
      <button className={`${styles[`btn-${visualState}`]}  ${styles[variant]}`}>
        {/* action */}
        <div
          className={`${styles[`text-${visualState}`]} ${styles[`text-${variant}`]}`}
        >
          {children}
        </div>
        {icon}

        {/* PriceAction */}
        <div
          className={
            variant === "priceAction"
              ? styles[`price-active`]
              : styles[`price-disable`]
          }
        >
          <div className={styles[`price-container`]}>
            <p className={styles.price}>
              <span>
                <PesoSign />
              </span>
              {price}
            </p>
            <p className={styles.dailyFair}>per day</p>
          </div>
        </div>
      </button>
    </>
  );
}
