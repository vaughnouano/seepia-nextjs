"use client";

import React, { useState } from "react";
import PreviousArrowIcon from "../../components/icons/PreviousArrowIcon";
import NextArrowIcon from "../../components/icons/NextArrowIcon";
import IconButton from "../../components/ui/button/IconButton/IconButton";
import CalendarDay from "../../components/ui/calendarDay/CalendarDay";
import {
  getMonthGrid,
  formatDateKey,
  getUnavailableDates,
} from "../../lib/calendarHelpers";
import { mockBookings } from "../../lib/mockBooking";
import styles from "./Calendar.module.css";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar({
  cameraId,
  selectedDates = [],
  onSelectDate,
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const cells = getMonthGrid(viewYear, viewMonth);
  const unavailableDates = getUnavailableDates(mockBookings, cameraId);
  const todayKey = formatDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  function goToPreviousMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((year) => year - 1);
    } else {
      setViewMonth((month) => month - 1);
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((year) => year + 1);
    } else {
      setViewMonth((month) => month + 1);
    }
  }

  function getDayState(day) {
    const dateKey = formatDateKey(viewYear, viewMonth, day);
    if (unavailableDates.has(dateKey)) return "unavailable";
    if (selectedDates.includes(dateKey)) return "selected";
    if (dateKey === todayKey) return "today";
    return "available";
  }

  return (
    <div className={styles.card}>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.month}>{MONTH_NAMES[viewMonth]}</h2>
            <p className={styles.year}>{viewYear}</p>
          </div>

          <div className={styles.navButtons}>
            <IconButton
              iconContent={<PreviousArrowIcon />}
              onClick={goToPreviousMonth}
            />
            <IconButton
              iconContent={<NextArrowIcon />}
              onClick={goToNextMonth}
            />
          </div>
        </div>

        <div className={styles.weekdayRow}>
          {WEEKDAY_LABELS.map((label) => (
            <span key={label} className={styles.weekdayLabel}>
              {label}
            </span>
          ))}
        </div>

        <div className={styles.grid_container}>
          <div className={styles.grid}>
            {cells.map((day, index) => {
              if (day === null) {
                return <CalendarDay key={`empty-${index}`} state="empty" />;
              }
              const dateKey = formatDateKey(viewYear, viewMonth, day);
              return (
                <CalendarDay
                  key={dateKey}
                  day={day}
                  state={getDayState(day)}
                  onClick={() => onSelectDate?.(dateKey)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
