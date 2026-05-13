export type ForecastEntry = {
  dt: number;
  dtTxt: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pop: number;
  windSpeed: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
};

export type ForecastPayload = {
  city: { name: string; country: string; timezone: number };
  list: ForecastEntry[];
};

export type ApiError = { error: string };

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as { error: unknown }).error === "string"
  );
}

export function toLocalDateKey(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatJapaneseDate(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

export function formatJapaneseTime(unixSeconds: number): string {
  return new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(unixSeconds * 1000));
}

export function groupByDate(list: ForecastEntry[]): Record<string, ForecastEntry[]> {
  return list.reduce<Record<string, ForecastEntry[]>>((acc, entry) => {
    const key = toLocalDateKey(entry.dt);
    (acc[key] ??= []).push(entry);
    return acc;
  }, {});
}

export function summarizeDay(entries: ForecastEntry[]): {
  tempMin: number;
  tempMax: number;
  humidityAvg: number;
  popMax: number;
  representative: ForecastEntry;
} {
  const tempMin = Math.min(...entries.map((e) => e.tempMin));
  const tempMax = Math.max(...entries.map((e) => e.tempMax));
  const humidityAvg = Math.round(
    entries.reduce((sum, e) => sum + e.humidity, 0) / entries.length,
  );
  const popMax = Math.max(...entries.map((e) => e.pop));
  const noon = entries.find((e) => new Date(e.dt * 1000).getHours() === 12);
  const representative = noon ?? entries[Math.floor(entries.length / 2)];
  return { tempMin, tempMax, humidityAvg, popMax, representative };
}
