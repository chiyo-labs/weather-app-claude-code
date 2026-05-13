import type { NextRequest } from "next/server";

const FORECAST_ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast";

type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  pop: number;
  rain?: { "3h"?: number };
  snow?: { "3h"?: number };
};

type ForecastResponse = {
  cod: string;
  message: string | number;
  city: { name: string; country: string; timezone: number };
  list: ForecastItem[];
};

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "サーバーにAPIキーが設定されていません。" },
      { status: 500 },
    );
  }

  const city = request.nextUrl.searchParams.get("city")?.trim();
  if (!city) {
    return Response.json(
      { error: "都市名を入力してください。" },
      { status: 400 },
    );
  }

  const url = new URL(FORECAST_ENDPOINT);
  url.searchParams.set("q", city);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "ja");

  let upstream: Response;
  try {
    upstream = await fetch(url, { cache: "no-store" });
  } catch {
    return Response.json(
      { error: "天気情報の取得に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 },
    );
  }

  if (upstream.status === 404) {
    return Response.json(
      { error: "都市名を確認してください。該当する都市が見つかりませんでした。" },
      { status: 404 },
    );
  }
  if (upstream.status === 401) {
    return Response.json(
      { error: "APIキーが無効です。設定を確認してください。" },
      { status: 500 },
    );
  }
  if (!upstream.ok) {
    return Response.json(
      { error: "天気情報の取得に失敗しました。" },
      { status: upstream.status },
    );
  }

  const data = (await upstream.json()) as ForecastResponse;

  return Response.json({
    city: { name: data.city.name, country: data.city.country, timezone: data.city.timezone },
    list: data.list.map((item) => ({
      dt: item.dt,
      dtTxt: item.dt_txt,
      temp: item.main.temp,
      feelsLike: item.main.feels_like,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      humidity: item.main.humidity,
      pop: item.pop,
      windSpeed: item.wind.speed,
      weather: {
        id: item.weather[0]?.id,
        main: item.weather[0]?.main,
        description: item.weather[0]?.description ?? "",
        icon: item.weather[0]?.icon ?? "",
      },
    })),
  });
}
