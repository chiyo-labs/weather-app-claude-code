"use client";

import { useMemo, useState } from "react";
import DateSelector from "@/components/DateSelector";
import DaySummary from "@/components/DaySummary";
import ForecastCard from "@/components/ForecastCard";
import LifeAdvice from "@/components/LifeAdvice";
import SavedCities from "@/components/SavedCities";
import SearchBar from "@/components/SearchBar";
import {
  type ForecastPayload,
  groupByDate,
  isApiError,
} from "@/lib/weather";
import { useSavedCities } from "@/lib/useSavedCities";

export default function Home() {
  const [data, setData] = useState<ForecastPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const [lastCity, setLastCity] = useState<string>("");

  const { cities, saveCity, removeCity } = useSavedCities();

  const grouped = useMemo(() => (data ? groupByDate(data.list) : {}), [data]);
  const availableDates = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  const selectedDate =
    pickedDate && availableDates.includes(pickedDate)
      ? pickedDate
      : (availableDates[0] ?? "");

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setLastCity(city);
    setPickedDate(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json: unknown = await res.json();
      if (!res.ok) {
        const message = isApiError(json) ? json.error : "取得に失敗しました。";
        setError(message);
        setData(null);
        return;
      }
      setData(json as ForecastPayload);
    } catch {
      setError("ネットワークエラーが発生しました。接続を確認してください。");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const dayEntries = selectedDate ? grouped[selectedDate] ?? [] : [];

  const currentCityName = data?.city.name ?? "";

  return (
    <div className="flex flex-1 flex-col items-center bg-gradient-to-b from-sky-50 to-white px-4 py-8 dark:from-zinc-950 dark:to-black sm:px-6 sm:py-12">
      <main className="flex w-full max-w-3xl flex-col gap-6">
        <header className="text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            天気予報
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            都市名を入力して、5日間 / 3時間ごとの予報をチェック。
          </p>
        </header>

        <SearchBar
          initialCity={lastCity}
          loading={loading}
          onSearch={handleSearch}
        />

        <SavedCities
          cities={cities}
          currentCity={currentCityName}
          onSelect={handleSearch}
          onSave={() => saveCity(currentCityName)}
          onRemove={removeCity}
        />

        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
            読み込み中…
          </div>
        )}

        {error && !loading && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}

        {!loading && !error && !data && (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/60 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            都市名を入力して検索ボタンを押してください。
          </div>
        )}

        {data && !loading && !error && (
          <>
            <DateSelector
              availableDates={availableDates}
              selectedDate={selectedDate}
              onSelect={setPickedDate}
            />

            {selectedDate && dayEntries.length > 0 && (
              <DaySummary
                cityName={data.city.name}
                country={data.city.country}
                dateKey={selectedDate}
                entries={dayEntries}
              />
            )}

            {selectedDate && dayEntries.length > 0 && (
              <LifeAdvice entries={dayEntries} />
            )}

            <section aria-label="時間ごとの予報">
              <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                時間ごとの予報
              </h3>
              <ul className="flex flex-col gap-2">
                {dayEntries.map((entry) => (
                  <li key={entry.dt}>
                    <ForecastCard entry={entry} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        <footer className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Data:{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-600"
          >
            OpenWeatherMap
          </a>
        </footer>
      </main>
    </div>
  );
}
