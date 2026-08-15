export const pricing = {
  "1-2day": 500,
  "3-4day": 450,
  custom: 400,
};

// server-side-safe calculation — reused wherever total_price needs recalculating
export function calculateTotalPrice(durationType, numberOfDays) {
  const rate = pricing[durationType];
  if (!rate) return 0;
  return rate * numberOfDays;
}
