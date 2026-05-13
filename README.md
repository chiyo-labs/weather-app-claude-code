# weather-app-claude-code

OpenWeatherMap API と連携した、Next.js + TypeScript + Tailwind CSS による天気予報 Web アプリ。AI エンジニア講座の課題提出用に Claude Code / Cursor を活用して作成しました。

## 概要

- 任意の都市名を入力すると、その都市の **5 日間 / 3 時間ごとの予報**を取得します。
- カレンダー風の日付セレクターで、見たい日の予報に切り替えできます。
- 気温・天気・湿度・降水確率に加えて、体感温度・風速・最高 / 最低気温も表示します。

## 機能

- 🔎 都市名検索（日本語 / 英語 / 海外の都市名に対応）
- 📅 日付選択（5 日先までの予報を日ごとに切り替え）
- 🌡️ 気温・体感温度（摂氏 / metric）
- 💧 湿度・降水確率 (pop)
- 💨 風速
- 🇯🇵 日本語表示（`lang=ja`）
- 📱 モバイルファーストのレスポンシブ UI
- ⏳ 読み込み中インジケーター
- ⚠️ 都市が見つからない場合などのエラーメッセージ表示

## 使い方

### 1. リポジトリを取得して依存関係をインストール

```bash
git clone <this-repo-url>
cd weather-app-claude-code
npm install
```

### 2. OpenWeatherMap の API キーを取得

[OpenWeatherMap](https://openweathermap.org/api) でサインアップし、API キーを取得します。

### 3. `.env.local` を作成

プロジェクトルートに `.env.local` を作成し、以下を記述します（`.env.example` を参考にしてください）。

```bash
OPENWEATHER_API_KEY=取得したAPIキー
```

> API キーはサーバー側の API Route (`app/api/weather/route.ts`) でのみ使用され、フロントエンドのバンドルには含まれません。

### 4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 使用技術

- [Next.js 16](https://nextjs.org/) (App Router / Turbopack)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [OpenWeatherMap 5 day / 3 hour Forecast API](https://openweathermap.org/forecast5)

## 環境変数

| 変数名                 | 用途                                         | 必須 |
| ---------------------- | -------------------------------------------- | ---- |
| `OPENWEATHER_API_KEY`  | OpenWeatherMap API のキー (サーバー側のみ)   | ✅   |

`NEXT_PUBLIC_` プレフィックスを付けないため、クライアントには露出しません。

## ディレクトリ構成（主要)

```
weather-app-claude-code/
├─ app/
│  ├─ api/
│  │  └─ weather/route.ts     # OpenWeatherMap を呼び出す API Route
│  ├─ layout.tsx
│  ├─ globals.css
│  └─ page.tsx                # メイン画面 (Client Component)
├─ components/
│  ├─ SearchBar.tsx
│  ├─ DateSelector.tsx
│  ├─ DaySummary.tsx
│  └─ ForecastCard.tsx
├─ lib/
│  └─ weather.ts              # 型定義 / 日付ユーティリティ
└─ .env.example
```

## アーキテクチャ

```
[Browser]
  └── fetch("/api/weather?city=Tokyo")
        └── [Next.js Route Handler]
              └── fetch("https://api.openweathermap.org/data/2.5/forecast?…", {appid})
```

- API キーはサーバー側でのみ参照（`process.env.OPENWEATHER_API_KEY`）。
- 単位は `metric`、言語は `lang=ja` で OpenWeatherMap を呼び出し。
- レスポンスはフロントに渡しやすい形に整形して返却。

## デプロイ

### Vercel

1. このリポジトリを GitHub に push します。
2. [Vercel](https://vercel.com/new) で GitHub リポジトリをインポートします。
3. Vercel の **Project Settings → Environment Variables** で `OPENWEATHER_API_KEY` を設定します。
4. デプロイすると公開 URL が発行されます。

### デプロイ URL

> 例: `https://weather-app-claude-code.vercel.app`
>
> ※ 公開後にここを実際の URL に置き換えてください。

## スクリプト

```bash
npm run dev    # 開発サーバー (Turbopack)
npm run build  # 本番ビルド
npm run start  # ビルド済みアプリを起動
npm run lint   # ESLint
```

## ライセンス

学習用途のため、ライセンスは設定していません。
