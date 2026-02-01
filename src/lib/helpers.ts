export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
export function getCurrentTimeInRochester(): Date {
  // Rochester, NY is America/New_York
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
}

export function formatTimeForRochester(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date) + " ET";
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
