import React from "react";
import styles from "./CalendarDay.module.css";

const STATE_CLASS = {
  empty: styles.empty,
  unavailable: styles.unavailable,
  available: styles.available,
  today: styles.today,
  selected: styles.selected,
};

export default function CalendarDay({ day, state = "available", onClick }) {
  if (state === "empty") {
    return <div className={`${styles.day} ${styles.empty}`} />;
  }

  return (
    <button
      type="button"
      className={`${styles.day} ${STATE_CLASS[state] ?? styles.available}`}
      onClick={onClick}
      disabled={state === "unavailable"}
    >
      {day}
    </button>
  );
}
