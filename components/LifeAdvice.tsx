import type { ForecastEntry } from "@/lib/weather";
import { summarizeDay } from "@/lib/weather";
import { getLifeAdvice, type AdviceItem } from "@/lib/weatherAdvice";

type Props = {
  entries: ForecastEntry[];
};

type CategoryStyle = {
  label: string;
  header: string;
  border: string;
  divider: string;
};

const CATEGORY_STYLES: Record<AdviceItem["category"], CategoryStyle> = {
  服装: {
    label: "👕 服装",
    header: "bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-200",
    border: "border-sky-200 dark:border-sky-800/60",
    divider: "divide-sky-100 dark:divide-sky-900/60",
  },
  持ち物: {
    label: "🎒 持ち物",
    header:
      "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200",
    border: "border-emerald-200 dark:border-emerald-800/60",
    divider: "divide-emerald-100 dark:divide-emerald-900/60",
  },
  体調注意: {
    label: "❤️ 体調注意",
    header: "bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200",
    border: "border-rose-200 dark:border-rose-800/60",
    divider: "divide-rose-100 dark:divide-rose-900/60",
  },
};

const CATEGORIES = ["服装", "持ち物", "体調注意"] as const;

export default function LifeAdvice({ entries }: Props) {
  const summary = summarizeDay(entries);
  const advice = getLifeAdvice(summary);

  const activeCategories = CATEGORIES.filter((cat) =>
    advice.some((a) => a.category === cat),
  );

  if (activeCategories.length === 0) return null;

  return (
    <section aria-label="生活サポートアドバイス">
      <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        生活サポートアドバイス
      </h3>
      <div className="flex flex-col gap-3">
        {activeCategories.map((cat) => {
          const style = CATEGORY_STYLES[cat];
          const items = advice.filter((a) => a.category === cat);
          return (
            <div
              key={cat}
              className={`overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-900 ${style.border}`}
            >
              <div
                className={`px-4 py-2 text-xs font-bold tracking-wide ${style.header}`}
              >
                {style.label}
              </div>
              <ul className={`divide-y ${style.divider}`}>
                {items.map((item, i) => (
                  <li key={i} className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-0.5 shrink-0 text-xl leading-none"
                      >
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
