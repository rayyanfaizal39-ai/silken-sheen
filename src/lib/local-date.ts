export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isTimestampOnLocalDate(timestamp: number, dateKey: string): boolean {
  const date = new Date(timestamp);
  return !Number.isNaN(date.getTime()) && getLocalDateKey(date) === dateKey;
}
