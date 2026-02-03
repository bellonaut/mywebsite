export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}

/**
 * Returns a Date object representing "now" rendered in a target IANA timezone.
 * Note: This creates a Date based on a localized string. For display, prefer formatTimeInZone.
 */
export function getCurrentTimeInZone(timeZone: string): Date {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone }));
}

/**
 * Formats time for a target IANA timezone using Intl (DST-safe).
 */
export function formatTimeInZone(date: Date, timeZone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Edmonton is Mountain Time but the correct IANA zone is America/Edmonton
export function getCurrentTimeInMountain(): Date {
  return getCurrentTimeInZone("America/Edmonton");
}
export function formatTimeForMountain(date: Date): string {
  return formatTimeInZone(date, "America/Edmonton");
}

// Sokoto uses West Africa Time; best match is Africa/Lagos
export function getCurrentTimeInSokoto(): Date {
  return getCurrentTimeInZone("Africa/Lagos");
}
export function formatTimeForSokoto(date: Date): string {
  return formatTimeInZone(date, "Africa/Lagos");
}

// New York (Eastern Time)
export function getCurrentTimeInNewYork(): Date {
  return getCurrentTimeInZone("America/New_York");
}
export function formatTimeForNewYork(date: Date): string {
  return formatTimeInZone(date, "America/New_York");
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
