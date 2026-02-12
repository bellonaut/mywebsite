import type { APIRoute } from "astro";

const NOTIFY_EMAIL =
  import.meta.env.NOTIFY_EMAIL ?? "bashiraminubellok@gmail.com";
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_FROM = import.meta.env.RESEND_FROM ?? "onboarding@resend.dev";
const NOTIFY_EXCLUDE_IPS = import.meta.env.NOTIFY_EXCLUDE_IPS ?? "";

type Interaction = {
  type?: string;
  label?: string;
  href?: string;
  atMs?: number;
};

type VisitPayload = {
  sessionId?: string;
  url?: string;
  path?: string;
  referrer?: string | null;
  startedAt?: number;
  durationMs?: number;
  timezone?: string;
  language?: string;
  interactions?: Interaction[];
  utm?: Record<string, string>;
  suppressNotifications?: boolean;
};

const RATE_LIMIT_POINTS = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const requestLog = new Map<string, number[]>();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStringRecord = (value: unknown): value is Record<string, string> => {
  if (!isRecord(value)) return false;
  return Object.values(value).every((entry) => typeof entry === "string");
};

const validateInteraction = (value: unknown): value is Interaction => {
  if (!isRecord(value)) return false;
  return ["type", "label", "href"].every((key) => {
    const field = value[key];
    return field === undefined || typeof field === "string";
  }) && (value.atMs === undefined || typeof value.atMs === "number");
};

const validatePayload = (value: unknown): VisitPayload | null => {
  if (!isRecord(value)) return null;

  const interactions = value.interactions;
  if (
    interactions !== undefined &&
    (!Array.isArray(interactions) || !interactions.every(validateInteraction))
  ) {
    return null;
  }

  if (value.utm !== undefined && !isStringRecord(value.utm)) {
    return null;
  }

  const candidate = value as VisitPayload;
  const fieldChecks: Array<[unknown, string]> = [
    [candidate.sessionId, "string"],
    [candidate.url, "string"],
    [candidate.path, "string"],
    [candidate.timezone, "string"],
    [candidate.language, "string"],
    [candidate.suppressNotifications, "boolean"],
    [candidate.startedAt, "number"],
    [candidate.durationMs, "number"],
  ];

  for (const [field, type] of fieldChecks) {
    if (field !== undefined && typeof field !== type) return null;
  }

  if (candidate.referrer !== undefined && candidate.referrer !== null && typeof candidate.referrer !== "string") {
    return null;
  }

  return candidate;
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const existing = requestLog.get(key) ?? [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_POINTS;
};

const formatDuration = (durationMs?: number) => {
  if (!durationMs || durationMs < 0) return "Unknown";
  const totalSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
};

const formatInteractions = (interactions: Interaction[] = []) => {
  if (!interactions.length) return "No recorded interactions.";
  return interactions
    .slice(0, 30)
    .map((interaction) => {
      const label = interaction.label ?? "Unknown";
      const when = interaction.atMs ? `${Math.round(interaction.atMs / 1000)}s` : "?";
      const href = interaction.href ? ` (${interaction.href})` : "";
      return `- ${label}${href} at ${when}`;
    })
    .join("\n");
};

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY) {
    return new Response("Missing RESEND_API_KEY", { status: 500 });
  }

  let payload: VisitPayload | null = null;
  try {
    payload = validatePayload(await request.json());
  } catch {
    return new Response("Invalid payload", { status: 400 });
  }

  if (!payload) {
    return new Response("Invalid payload", { status: 400 });
  }

  const headers = request.headers;
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("cf-connecting-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return new Response("Too many requests", { status: 429 });
  }
  const excludedIps = NOTIFY_EXCLUDE_IPS.split(",")
    .map((value: string) => value.trim())
    .filter(Boolean);
  const city = headers.get("x-vercel-ip-city");
  const region = headers.get("x-vercel-ip-country-region");
  const country = headers.get("x-vercel-ip-country");
  const latitude = headers.get("x-vercel-ip-latitude");
  const longitude = headers.get("x-vercel-ip-longitude");

  const url = payload?.url ?? "Unknown";
  const referrer = payload?.referrer || "Direct / unknown";
  const duration = formatDuration(payload?.durationMs);
  const startedAt = payload?.startedAt
    ? new Date(payload.startedAt).toISOString()
    : "Unknown";
  const timezone = payload?.timezone ?? "Unknown";
  const language = payload?.language ?? "Unknown";
  const utmEntries = payload?.utm ?? {};
  const utm =
    Object.keys(utmEntries).length === 0
      ? "None"
      : Object.entries(utmEntries)
          .map(([key, value]) => `${key}=${value}`)
          .join(", ");

  const locationParts = [city, region, country].filter(Boolean);
  const location =
    locationParts.length > 0 ? locationParts.join(", ") : "Unknown";
  const coordinates =
    latitude && longitude ? `${latitude}, ${longitude}` : "Unknown";

  if (payload?.suppressNotifications) {
    return new Response("Notifications suppressed", { status: 204 });
  }

  if (excludedIps.includes(ip)) {
    return new Response("Excluded IP", { status: 204 });
  }

  const textBody = [
    "New bashir.bio visit summary",
    "",
    `URL: ${url}`,
    `Referrer: ${referrer}`,
    `Time on site: ${duration}`,
    `Started at: ${startedAt}`,
    `Timezone: ${timezone}`,
    `Language: ${language}`,
    `UTM: ${utm}`,
    `Location: ${location}`,
    `Coordinates: ${coordinates}`,
    `IP: ${ip ?? "Unknown"}`,
    "",
    "Interactions:",
    formatInteractions(payload?.interactions),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [NOTIFY_EMAIL],
      subject: `New visit on bashir.bio (${payload?.path ?? "/"})`,
      text: textBody,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Visit API upstream error", {
      status: response.status,
      errorText,
    });
    return new Response(errorText, { status: 500 });
  }

  return new Response("ok", { status: 200 });
};
