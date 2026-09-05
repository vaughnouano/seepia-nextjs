"use client";

import Styles from "./page.module.css";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Calendar from "../../../../components/calendar/Calendar";
import BookingPanel from "../../../../components/calendar/BookingPanel";
import { cameras } from "../../../../lib/camera";
import { supabase } from "../../../../lib/supabaseClient";
import { getUnavailableDates } from "../../../../lib/calendarHelpers";
import {
  addDays,
  daysBetween,
  getDateRangeArray,
  getContinuousAvailableRun,
} from "../../../../lib/rangeSelection";

const DURATION_TIERS = {
  "1-2day": { minLength: 1, maxLength: 2 },
  "3-4day": { minLength: 3, maxLength: 4 },
  custom: { minLength: 5, maxLength: null },
};

export default function CalendarPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();

  const initialIndex = Math.max(
    cameras.findIndex((camera) => camera.slug === slug),
    0,
  );

  const [cameraIndex, setCameraIndex] = useState(initialIndex);
  const [durationTier, setDurationTier] = useState("1-2day");
  const [selectedRange, setSelectedRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const camera = cameras[cameraIndex];
  const tier = DURATION_TIERS[durationTier];

  // Fetch real availability from Supabase whenever the selected camera changes.
  // Reads only from `booking_availability` — the safe, PII-free view — never
  // the real `bookings` table, since this runs for anonymous site visitors.
  useEffect(() => {
    let isCancelled = false;

    async function fetchAvailability() {
      setIsLoading(true);
      setLoadError(null);

      const { data, error } = await supabase
        .from("booking_availability")
        .select("camera_id, start_date, end_date, status")
        .eq("camera_id", camera.slug);

      // console.log("RAW Supabase response — data:", data);
      // console.log("RAW Supabase response — error:", error);

      if (isCancelled) return;

      if (error) {
        setLoadError(error.message);
        setBookings([]);
      } else {
        setBookings(data ?? []);
      }
      setIsLoading(false);
    }

    fetchAvailability();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        fetchAvailability();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isCancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [camera.slug]);

  const unavailableDates = getUnavailableDates(bookings, camera.slug);
  // console.log("bookings state:", bookings);
  // console.log("camera.slug:", camera.slug);
  // console.log("unavailableDates set:", Array.from(unavailableDates));

  function resetSelection() {
    setSelectedRange(null);
    setHoveredDate(null);
  }

  function goToPreviousCamera() {
    setCameraIndex((index) => (index === 0 ? cameras.length - 1 : index - 1));
    resetSelection();
  }

  function goToNextCamera() {
    setCameraIndex((index) => (index === cameras.length - 1 ? 0 : index + 1));
    resetSelection();
  }

  function handleSelectDurationTier(tierKey) {
    setDurationTier(tierKey);
    resetSelection();
  }

  function isValidStart(dateKey) {
    if (unavailableDates.has(dateKey)) return false;
    return (
      getContinuousAvailableRun(dateKey, unavailableDates) >= tier.minLength
    );
  }

  function isRangeContinuousFrom(startKey, endKey) {
    let current = startKey;
    while (current <= endKey) {
      if (unavailableDates.has(current)) return false;
      current = addDays(current, 1);
    }
    return true;
  }

  function handleSelectDate(dateKey) {
    if (unavailableDates.has(dateKey)) return;

    if (!selectedRange) {
      if (!isValidStart(dateKey)) return;
      setSelectedRange({
        start: dateKey,
        end: addDays(dateKey, tier.minLength - 1),
      });
      return;
    }

    const { start, end } = selectedRange;
    const currentLength = daysBetween(start, end) + 1;

    if (dateKey === end) {
      if (currentLength > tier.minLength) {
        setSelectedRange({ start, end: addDays(end, -1) });
      } else {
        setSelectedRange(null);
      }
      return;
    }

    if (dateKey === addDays(end, 1)) {
      const newLength = daysBetween(start, dateKey) + 1;
      if (tier.maxLength === null || newLength <= tier.maxLength) {
        setSelectedRange({ start, end: dateKey });
      }
      return;
    }

    if (dateKey === addDays(start, -1)) {
      const newLength = daysBetween(dateKey, end) + 1;
      if (tier.maxLength === null || newLength <= tier.maxLength) {
        setSelectedRange({ start: dateKey, end });
      }
      return;
    }

    if (dateKey > end) {
      const newLength = daysBetween(start, dateKey) + 1;
      if (
        (tier.maxLength === null || newLength <= tier.maxLength) &&
        isRangeContinuousFrom(addDays(end, 1), dateKey)
      ) {
        setSelectedRange({ start, end: dateKey });
        return;
      }
    }
    if (dateKey < start) {
      const newLength = daysBetween(dateKey, end) + 1;
      if (
        (tier.maxLength === null || newLength <= tier.maxLength) &&
        isRangeContinuousFrom(dateKey, addDays(start, -1))
      ) {
        setSelectedRange({ start: dateKey, end });
        return;
      }
    }

    if (!isValidStart(dateKey)) return;
    setSelectedRange({
      start: dateKey,
      end: addDays(dateKey, tier.minLength - 1),
    });
  }

  function getHoverState(dateKey) {
    if (!hoveredDate) return null;

    if (!selectedRange) {
      if (!isValidStart(hoveredDate)) return null;

      const run = getContinuousAvailableRun(hoveredDate, unavailableDates);
      const requiredEnd = addDays(hoveredDate, tier.minLength - 1);
      const optionalLength = tier.maxLength
        ? Math.min(tier.maxLength, run)
        : run;
      const optionalEnd = addDays(hoveredDate, optionalLength - 1);

      if (dateKey < hoveredDate || dateKey > optionalEnd) return null;
      if (dateKey <= requiredEnd) return "required";
      return "optional";
    }

    const { start, end } = selectedRange;
    const currentLength = daysBetween(start, end) + 1;

    if (hoveredDate > end) {
      const extension = daysBetween(end, hoveredDate);
      const newLength = currentLength + extension;
      if (tier.maxLength !== null && newLength > tier.maxLength) return null;
      if (!isRangeContinuousFrom(addDays(end, 1), hoveredDate)) return null;

      if (dateKey > end && dateKey <= hoveredDate) return "optional";
      return null;
    }

    if (hoveredDate < start) {
      const extension = daysBetween(hoveredDate, start);
      const newLength = currentLength + extension;
      if (tier.maxLength !== null && newLength > tier.maxLength) return null;
      if (!isRangeContinuousFrom(hoveredDate, addDays(start, -1))) return null;

      if (dateKey >= hoveredDate && dateKey < start) return "optional";
      return null;
    }

    return null;
  }

  const selectedDates = selectedRange
    ? getDateRangeArray(selectedRange.start, selectedRange.end)
    : [];

  function handleBook() {
    console.log("handleBook fired"); // temporary debug line
    if (!selectedRange) return;
    const bookingDraft = {
      camera_id: camera.slug,
      duration_type: durationTier,
      start_date: selectedRange.start,
      end_date: selectedRange.end,
    };
    sessionStorage.setItem("bookingDraft", JSON.stringify(bookingDraft));
    router.push(`/booking/${camera.slug}`);
  }

  return (
    <main className={Styles.container}>
      <div className={Styles.card}>
        <BookingPanel
          camera={camera}
          onPrevCamera={goToPreviousCamera}
          onNextCamera={goToNextCamera}
          durationTier={durationTier}
          onSelectDurationTier={handleSelectDurationTier}
          onBook={handleBook}
        />
        {loadError && (
          <p role="alert">Couldn't load availability: {loadError}</p>
        )}
        <Calendar
          cameraId={camera.slug}
          unavailableDates={unavailableDates}
          selectedDates={selectedDates}
          onSelectDate={handleSelectDate}
          getHoverState={getHoverState}
          onHoverDate={setHoveredDate}
          onHoverEnd={() => setHoveredDate(null)}
        />
      </div>
    </main>
  );
}
