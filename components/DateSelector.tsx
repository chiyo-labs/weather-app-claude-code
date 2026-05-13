"use client";

import { formatJapaneseDate } from "@/lib/weather";

type Props = {
  availableDates: string[];
  selectedDate: string;
  onSelect: (date: string) => void;
};

export default function DateSelector({ availableDates, selectedDate, onSelect }: Props) {
  if (availableDates.length === 0) return null;

  return (
    <div className="w-full">
      <label
        htmlFor="forecast-date"
        className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        予報日を選択
      </label>

      <select
        id="forecast-date"
        value={selectedDate}
        onChange={(e) => onSelect(e.target.value)}
        className="mb-3 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 sm:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {formatJapaneseDate(date)}
          </option>
        ))}
      </select>

      <div
        role="tablist"
        aria-label="予報日選択"
        className="hidden gap-2 overflow-x-auto pb-1 sm:flex"
      >
        {availableDates.map((date) => {
          const active = date === selectedDate;
          return (
            <button
              key={date}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(date)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-sky-600 text-white shadow"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {formatJapaneseDate(date)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
