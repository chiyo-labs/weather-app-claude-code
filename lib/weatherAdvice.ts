import type { ForecastEntry } from "./weather";

export type AdviceCategory = "服装" | "持ち物" | "体調注意";

export type AdviceItem = {
  category: AdviceCategory;
  icon: string;
  title: string;
  detail: string;
};

type DaySummaryInput = {
  tempMin: number;
  tempMax: number;
  humidityAvg: number;
  popMax: number;
  representative: ForecastEntry;
};

export function getLifeAdvice(summary: DaySummaryInput): AdviceItem[] {
  const { tempMin, tempMax, popMax, representative } = summary;
  const weatherId = representative.weather.id;
  const tempDiff = tempMax - tempMin;
  const items: AdviceItem[] = [];

  // ── 服装（必ず1件表示） ──────────────────────────────────
  if (tempMax >= 25) {
    items.push({
      category: "服装",
      icon: "☀️",
      title: "半袖が主役（初夏〜真夏）",
      detail:
        "日向では汗ばむ陽気です。半袖Tシャツやノースリーブが快適に過ごせます。室内や電車内の冷房対策として、薄手のカーディガンを1枚持ち歩くと安心です。",
    });
  } else if (tempMax >= 21) {
    items.push({
      category: "服装",
      icon: "🌤️",
      title: "長袖トップス1枚",
      detail:
        "長袖シャツや薄手のカットソー1枚でちょうどよく過ごせます。朝晩は少し肌寒さを感じるため、薄手の羽織りがあると便利です。",
    });
  } else if (tempMax >= 16) {
    items.push({
      category: "服装",
      icon: "☁️",
      title: "薄手のライトアウター",
      detail:
        "長袖1枚だとやや肌寒く感じる気温です。カーディガン、シャツジャケット、薄手のブルゾンなどの軽めのアウターがおすすめです。",
    });
  } else if (tempMax >= 12) {
    items.push({
      category: "服装",
      icon: "🍃",
      title: "しっかりめのアウター",
      detail:
        "トレンチコートやマウンテンパーカー、厚手のカーディガンなど、少ししっかりした上着がおすすめです。インナーで調節しやすい服装を意識してください。",
    });
  } else {
    items.push({
      category: "服装",
      icon: "❄️",
      title: "冬の防寒具が必要",
      detail:
        "コートやダウンジャケット、厚手のニットなど、防寒を意識した服装がおすすめです。マフラーや手袋などの小物も活用しましょう。",
    });
  }

  // 朝晩の寒暖差
  if (tempDiff >= 7) {
    items.push({
      category: "服装",
      icon: "🧣",
      title: "朝晩の寒暖差に注意",
      detail: "朝晩の寒暖差が大きそうです。羽織りがあると安心です。",
    });
  }

  // ── 持ち物 ──────────────────────────────────────────────
  if (popMax >= 0.4) {
    items.push({
      category: "持ち物",
      icon: "☂️",
      title: "傘",
      detail: "雨の可能性があります。傘を持っていくと安心です。",
    });
  }

  if (weatherId === 800 || tempMax >= 25) {
    items.push({
      category: "持ち物",
      icon: "🧢",
      title: "帽子・日傘",
      detail: "日差しや暑さに注意しましょう。帽子や日傘があると安心です。",
    });
  }

  // ── 体調注意 ─────────────────────────────────────────────
  if (tempMax >= 28) {
    items.push({
      category: "体調注意",
      icon: "💧",
      title: "水分補給",
      detail: "暑くなりそうです。水分補給を意識しましょう。",
    });
  }

  return items;
}
