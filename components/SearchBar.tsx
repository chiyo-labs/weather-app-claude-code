"use client";

import { useState } from "react";

type Props = {
  initialCity?: string;
  loading: boolean;
  onSearch: (city: string) => void;
};

export default function SearchBar({ initialCity = "", loading, onSearch }: Props) {
  const [city, setCity] = useState(initialCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="city" className="sr-only">
        都市名
      </label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="例: Tokyo / 大阪 / Paris"
        autoComplete="off"
        className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
      <button
        type="submit"
        disabled={loading || city.trim().length === 0}
        className="rounded-lg bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:disabled:bg-zinc-700"
      >
        {loading ? "取得中…" : "検索"}
      </button>
    </form>
  );
}
