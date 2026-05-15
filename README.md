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

## 追加機能

### 1. 生活サポートアドバイス

選択した日付の天気データをもとに「👕 服装」「🎒 持ち物」「❤️ 体調注意」の3カテゴリにわけてアドバイスをカード表示します。

#### 👕 服装（毎日必ず表示）

最高気温をもとに、その日の服装を提案します。

| 最高気温 | アドバイス |
|----------|-----------|
| 25°C 以上 | ☀️ 半袖が主役（初夏〜真夏） |
| 21〜24°C | 🌤️ 長袖トップス1枚 |
| 16〜20°C | ☁️ 薄手のライトアウター |
| 12〜15°C | 🍃 しっかりめのアウター |
| 11°C 以下 | ❄️ 冬の防寒具が必要 |

寒暖差が 7°C 以上の日は「🧣 朝晩の寒暖差に注意」を追加表示します。

#### 🎒 持ち物（条件に応じて表示）

| 条件 | アドバイス |
|------|-----------|
| 降水確率 40% 以上 | ☂️ 傘を持っていくと安心 |
| 晴れ、または最高気温 25°C 以上 | 🧢 帽子・日傘があると安心 |

#### ❤️ 体調注意（条件に応じて表示）

| 条件 | アドバイス |
|------|-----------|
| 最高気温 28°C 以上 | 💧 水分補給を意識しましょう |

- 複数条件に当てはまる場合はすべてのアドバイスを表示
- 持ち物・体調注意は条件に該当しない場合は非表示

### 2. お気に入り地域保存機能

よく見る都市を保存して、ワンタップで再検索できます。

- 都市を検索後「この地域を保存」ボタンで localStorage に保存
- 保存済みの都市名をタグ形式で一覧表示
- 都市名をタップするとその都市を再検索
- × ボタンで個別削除
- 重複保存を自動防止（大文字小文字を区別しない）
- ブラウザを閉じても保存内容は維持

### 3. 天気連動の背景・アイコン変更

選択した日の代表天気に合わせて DaySummary カードの背景グラデーションが変わります。

| 天気 | 背景 | 絵文字 |
|------|------|--------|
| 晴れ | 空色 → 青 | ☀️ |
| 薄曇り | 空色 → ブルー | 🌤️ |
| 曇り（少し） | 空色 → スレート | ⛅ |
| 曇り（多め / 厚曇り） | スレート → 亜鉛 | ☁️ |
| 霧雨 | 青 → スレート | 🌦️ |
| 雨 | 濃い青 → ダークスレート | 🌧️ |
| 雪 | 薄水色 → ブルー | ❄️ |
| 霧・靄 | スレート → 亜鉛 | 🌫️ |
| 雷雨 | ダークスレート → インディゴ | ⛈️ |

- 既存の OpenWeatherMap アイコン画像はそのまま維持
- ダークモードでも見やすいコントラストを確保

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
│  ├─ DateSelector.tsx        # 日付タブ選択
│  ├─ DaySummary.tsx          # 1日サマリー（天気連動背景）
│  ├─ ForecastCard.tsx        # 3時間ごとの予報カード
│  ├─ LifeAdvice.tsx          # 生活サポートアドバイス
│  ├─ SavedCities.tsx         # お気に入り地域の保存・一覧・削除
│  └─ SearchBar.tsx           # 都市名検索フォーム
├─ lib/
│  ├─ useSavedCities.ts       # お気に入り地域の localStorage フック
│  ├─ weather.ts              # 型定義 / 日付 / 集計ユーティリティ
│  ├─ weatherAdvice.ts        # 天気条件 → 生活アドバイス変換ロジック
│  └─ weatherTheme.ts         # weather ID → 背景グラデーション変換
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
