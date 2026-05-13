import type { ForecastEntry } from "@/lib/weather";
import { formatJapaneseTime } from "@/lib/weather";

type Props = {
  entry: ForecastEntry;
};

export default function ForecastCard({ entry }: Props) {
  const iconUrl = entry.weather.icon
    ? `https://openweathermap.org/img/wn/${entry.weather.icon}@2x.png`
    : null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="w-14 shrink-0 text-center font-mono text-sm text-zinc-600 dark:text-zinc-400">
        {formatJapaneseTime(entry.dt)}
      </div>
      <div className="flex shrink-0 items-center">
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={entry.weather.description}
            width={48}
            height={48}
            className="h-12 w-12"
          />
        ) : (
          <span className="text-2xl">🌤️</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {entry.weather.description}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          湿度 {entry.humidity}% / 降水確率 {Math.round(entry.pop * 100)}%
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-lg font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
          {Math.round(entry.temp)}°
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          体感 {Math.round(entry.feelsLike)}°
        </p>
      </div>
    </div>
  );
}
