import type { ForecastEntry } from "@/lib/weather";
import { formatJapaneseDate, summarizeDay } from "@/lib/weather";
import { getWeatherTheme } from "@/lib/weatherTheme";

type Props = {
  cityName: string;
  country: string;
  dateKey: string;
  entries: ForecastEntry[];
};

export default function DaySummary({ cityName, country, dateKey, entries }: Props) {
  const { tempMin, tempMax, humidityAvg, popMax, representative } = summarizeDay(entries);
  const iconUrl = representative.weather.icon
    ? `https://openweathermap.org/img/wn/${representative.weather.icon}@2x.png`
    : null;
  const theme = getWeatherTheme(representative.weather.id);

  return (
    <section className={`rounded-2xl bg-gradient-to-br ${theme.gradient} p-5 text-white shadow-lg sm:p-6`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold sm:text-2xl">
          {cityName}
          <span className="ml-2 text-sm font-normal opacity-80">{country}</span>
        </h2>
        <p className="text-sm opacity-90">{formatJapaneseDate(dateKey)}</p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {iconUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={representative.weather.description}
            width={96}
            height={96}
            className="h-20 w-20 drop-shadow sm:h-24 sm:w-24"
          />
        )}
        <div>
          <p className="text-3xl font-bold tabular-nums sm:text-4xl">
            {Math.round(representative.temp)}°C
          </p>
          <p className="text-base opacity-95">{representative.weather.description}</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-lg bg-white/15 px-3 py-2">
          <dt className="opacity-80">最高 / 最低</dt>
          <dd className="font-semibold tabular-nums">
            {Math.round(tempMax)}° / {Math.round(tempMin)}°
          </dd>
        </div>
        <div className="rounded-lg bg-white/15 px-3 py-2">
          <dt className="opacity-80">湿度</dt>
          <dd className="font-semibold tabular-nums">{humidityAvg}%</dd>
        </div>
        <div className="rounded-lg bg-white/15 px-3 py-2">
          <dt className="opacity-80">降水確率(最大)</dt>
          <dd className="font-semibold tabular-nums">{Math.round(popMax * 100)}%</dd>
        </div>
        <div className="rounded-lg bg-white/15 px-3 py-2">
          <dt className="opacity-80">風速</dt>
          <dd className="font-semibold tabular-nums">
            {representative.windSpeed.toFixed(1)} m/s
          </dd>
        </div>
      </dl>
    </section>
  );
}
