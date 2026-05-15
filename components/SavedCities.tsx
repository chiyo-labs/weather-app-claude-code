"use client";

type Props = {
  cities: string[];
  currentCity: string;
  onSelect: (city: string) => void;
  onSave: () => void;
  onRemove: (city: string) => void;
};

export default function SavedCities({
  cities,
  currentCity,
  onSelect,
  onSave,
  onRemove,
}: Props) {
  const alreadySaved = currentCity !== "" &&
    cities.some((c) => c.toLowerCase() === currentCity.toLowerCase());

  return (
    <section aria-label="お気に入り地域">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          お気に入り地域
        </h3>
        {currentCity && (
          <button
            type="button"
            onClick={onSave}
            disabled={alreadySaved}
            className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-900/40 dark:text-sky-300 dark:hover:bg-sky-800/60"
          >
            {alreadySaved ? "保存済み ✓" : "この地域を保存"}
          </button>
        )}
      </div>

      {cities.length === 0 ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          地域を検索後、「この地域を保存」ボタンで登録できます。
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <div key={city} className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => onSelect(city)}
                className="rounded-l-full rounded-r-none border border-r-0 border-zinc-200 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-sky-100 hover:text-sky-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-sky-900/40 dark:hover:text-sky-300"
              >
                {city}
              </button>
              <button
                type="button"
                onClick={() => onRemove(city)}
                aria-label={`${city}を削除`}
                className="rounded-l-none rounded-r-full border border-zinc-200 bg-zinc-100 px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
