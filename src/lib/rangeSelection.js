// lib/rangeSelection.js
// Date-math helpers for duration-tier range selection.
// Works on 'YYYY-MM-DD' strings to match Supabase's date format and
// calendarHelpers.js's formatDateKey output.

export function addDays(dateKey, amount) {
  const date = new Date(dateKey);
  date.setDate(date.getDate() + amount);
  return date.toISOString().split("T")[0];
}

export function daysBetween(startKey, endKey) {
  const diffMs = new Date(endKey).getTime() - new Date(startKey).getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function getDateRangeArray(startKey, endKey) {
  const range = [];
  let current = startKey;
  while (current <= endKey) {
    range.push(current);
    current = addDays(current, 1);
  }
  return range;
}

export function isRangeContinuousAvailable(startKey, endKey, unavailableDates) {
  return getDateRangeArray(startKey, endKey).every(
    (dateKey) => !unavailableDates.has(dateKey),
  );
}

// How many consecutive available days start at dateKey (capped to avoid runaway loops)
export function getContinuousAvailableRun(dateKey, unavailableDates, cap = 60) {
  let run = 0;
  let current = dateKey;
  while (run < cap && !unavailableDates.has(current)) {
    run += 1;
    current = addDays(current, 1);
  }
  return run;
}
