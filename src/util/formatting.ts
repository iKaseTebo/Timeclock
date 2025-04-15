export function hoursFormatter(decimalHours: number): string {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}h ${minutes}m`;
}

export function calculateTotalHours(
  checkIn: Date | string,
  checkOut: Date | string
): string {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();
  const difference = checkOutTime - checkInTime; // Difference in milliseconds
  const hours = difference / (1000 * 60 * 60); // Convert to hours
  return hoursFormatter(parseFloat(hours.toFixed(2))); // Format to 2 decimal places
}

export function timeDifferenceFromNow(checkIn: Date | string): string {
  const checkInTime = new Date(checkIn).getTime();
  const currentTime = new Date().getTime();
  const difference = currentTime - checkInTime; // Difference in milliseconds

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
    2,
    "0"
  )}m ${String(seconds).padStart(2, "0")}s`;
}
