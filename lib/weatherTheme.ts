export type WeatherTheme = {
  gradient: string;
  emoji: string;
};

/**
 * OpenWeatherMap の weather.id をもとに
 * DaySummary の背景グラデーションと絵文字アイコンを返す。
 *
 * id 体系:
 *   2xx = Thunderstorm  3xx = Drizzle  5xx = Rain
 *   6xx = Snow          7xx = Atmosphere
 *   800 = Clear         80x = Clouds
 */
export function getWeatherTheme(weatherId: number): WeatherTheme {
  if (weatherId >= 200 && weatherId < 300) {
    return { gradient: "from-slate-700 to-indigo-900", emoji: "⛈️" };
  }
  if (weatherId >= 300 && weatherId < 400) {
    return { gradient: "from-blue-500 to-slate-600", emoji: "🌦️" };
  }
  if (weatherId >= 500 && weatherId < 600) {
    return { gradient: "from-blue-600 to-slate-700", emoji: "🌧️" };
  }
  if (weatherId >= 600 && weatherId < 700) {
    return { gradient: "from-sky-300 to-blue-500", emoji: "❄️" };
  }
  if (weatherId >= 700 && weatherId < 800) {
    return { gradient: "from-slate-400 to-zinc-600", emoji: "🌫️" };
  }
  if (weatherId === 800) {
    return { gradient: "from-sky-400 to-blue-600", emoji: "☀️" };
  }
  if (weatherId === 801) {
    return { gradient: "from-sky-400 to-blue-500", emoji: "🌤️" };
  }
  if (weatherId === 802) {
    return { gradient: "from-sky-300 to-slate-500", emoji: "⛅" };
  }
  if (weatherId >= 803) {
    return { gradient: "from-slate-500 to-zinc-700", emoji: "☁️" };
  }
  return { gradient: "from-sky-500 to-indigo-600", emoji: "🌤️" };
}
