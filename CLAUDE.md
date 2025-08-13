# CLAUDE.md - 瀧川指数プロジェクト仕様書

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 プロジェクト概要

**瀧川指数**は、地方競馬の元ジョッキー瀧川寿樹也氏が監修する競馬指数サイトです。
- **目的**: 独自の分析による精度の高い競馬予想をポイント制で提供
- **特徴**: LINEログイン認証、ポイント購入システム、OCR/テキスト解析機能

## 🛠 技術スタック

- **フレームワーク**: Next.js 14.2.31 (Pages Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **認証**: NextAuth.js (LINE Provider)
- **データベース**: Prisma + PostgreSQL (Supabase)
- **決済**: Stripe
- **OCR/テキスト解析**: Claude API (Anthropic)
- **ホスティング**: Vercel (予定)

## 📁 ディレクトリ構造

```
takigawa/
├── pages/                 # Pages Router
│   ├── _app.tsx          # アプリケーションのエントリーポイント
│   ├── _document.tsx     # HTMLドキュメント設定
│   ├── index.tsx         # ホームページ
│   ├── races/            # レース関連ページ
│   │   ├── index.tsx     # レース一覧
│   │   └── [id].tsx      # レース詳細
│   ├── auth/             # 認証関連
│   │   └── login.tsx     # LINEログイン
│   ├── points/           # ポイント関連
│   │   └── purchase.tsx  # ポイント購入
│   ├── mypage/           # マイページ
│   └── admin/            # 管理者ページ
│       ├── index.tsx     # 管理者ダッシュボード
│       ├── races/        # レース管理
│       └── users/        # ユーザー管理
├── components/           # Reactコンポーネント
│   ├── Layout/          # レイアウトコンポーネント
│   │   ├── Header.tsx   # ヘッダー
│   │   └── Footer.tsx   # フッター
│   ├── Race/            # レース関連コンポーネント
│   ├── Auth/            # 認証関連コンポーネント
│   └── UI/              # 汎用UIコンポーネント
├── lib/                  # ユーティリティ関数
│   ├── prisma.ts        # Prismaクライアント
│   ├── auth.ts          # 認証関連
│   └── stripe.ts        # Stripe関連
├── prisma/              # データベース
│   └── schema.prisma    # スキーマ定義
├── styles/              # スタイル
│   └── globals.css      # グローバルCSS
├── public/              # 静的ファイル
└── types/               # TypeScript型定義
```

## 🔑 主要機能

### 1. ユーザー認証・権限管理
- **LINEログイン**: 必須（友達追加インセンティブあり）
- **ポイントシステム**: 1ポイント = 1円
- **初回ボーナス**: LINE友達追加で500ポイント

### 2. レース情報管理
- **レース閲覧**: 通常500ポイント/レース（管理者が変更可能）
- **無料レース**: 管理者が設定可能
- **NOTE連携**: 各レースごとにNOTE URLを設定可能

### 3. 管理者機能
- **レース登録**: 
  - OCR機能（競馬新聞の画像から自動入力）
  - テキスト解析（ネット競馬のテキストから自動入力）
- **指数入力**: 瀧川指数を手動入力
- **公開管理**: レースの公開/非公開設定

### 4. ポイント購入
- **パッケージ**: 500, 1000, 3000, 5000, 10000ポイント
- **決済**: Stripe使用

## 🎨 デザイン仕様

- **基本カラー**: 
  - プライマリ: #f59e0b (アンバー)
  - セカンダリ: #0ea5e9 (ブルー)
  - LINE: #00B900
- **フォント**: Noto Sans JP
- **レイアウト**: ネット競馬風の白ベースデザイン

## 🔐 環境変数

```env
# Database
DATABASE_URL=
DIRECT_URL=

# NextAuth
NEXTAUTH_URL=http://127.0.0.1:3000
NEXTAUTH_SECRET=

# LINE
LINE_CLIENT_ID=
LINE_CLIENT_SECRET=
NEXT_PUBLIC_LIFF_ID=
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
NEXT_PUBLIC_LINE_OFFICIAL_ID=
NEXT_PUBLIC_LINE_OFFICIAL_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Stripe Price IDs
STRIPE_PRICE_500=
STRIPE_PRICE_1000=
STRIPE_PRICE_3000=
STRIPE_PRICE_5000=
STRIPE_PRICE_10000=

# Claude API
ANTHROPIC_API_KEY=

# Admin
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

## 💡 開発時の注意事項

1. **localhost問題**: 開発時は必ず `http://127.0.0.1:3000` を使用（localhostだと404エラー）
2. **Node.jsバージョン**: v22.16.0で動作確認済み
3. **LINE認証**: 実装時はLIFF SDKの初期化が必要
4. **ポイント管理**: トランザクション処理を確実に実装
5. **OCR/テキスト解析**: Claude APIのレート制限に注意

## 📝 実装予定機能（優先順位順）

1. ✅ 基本的なプロジェクト構造
2. ⏳ ヘッダー・フッターコンポーネント
3. ⏳ ホームページ（ネット競馬風デザイン）
4. ⏳ Prismaセットアップとデータベース設計
5. ⏳ LINE認証実装
6. ⏳ レース一覧・詳細ページ
7. ⏳ ポイントシステム実装
8. ⏳ 管理者パネル（レース管理）
9. ⏳ OCR/テキスト解析機能
10. ⏳ Stripe決済統合
11. ⏳ LINE友達追加インセンティブ

## 🚀 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# Prisma
npx prisma generate  # クライアント生成
npx prisma db push   # スキーマ反映
npx prisma studio    # GUI管理画面
```

## 📌 参考情報

- ネット競馬: https://www.netkeiba.com/
- 瀧川氏のNOTE: （URL待ち）
- LINE公式アカウント: （ID待ち）

## 🔄 更新履歴

- 2024-01-13: プロジェクト初期セットアップ完了
- 2024-01-13: localhost問題を解決（127.0.0.1使用）
- 2024-01-13: ネット競馬風UIデザイン完成

## 🎨 UIデザイン仕様（重要：変更禁止）

### ヘッダーデザイン
1. **トップバー**: 
   - 背景: `bg-gray-800`
   - テキスト: 白色、サイズ`text-xs`
   - ポイント表示: 黄色`text-yellow-400`

2. **メインヘッダー**:
   - 背景: 白
   - 下線: `border-b-2 border-gray-300`
   - 高さ: `h-14`

3. **ロゴ（最重要）**:
   ```tsx
   <div className="flex items-center">
     {/* 指数・分析を表すアイコン */}
     <div className="mr-3">
       <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none">
         <path d="M3 12L7 16L13 10L17 14L21 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
         <circle cx="7" cy="16" r="2" fill="currentColor"/>
         <circle cx="13" cy="10" r="2" fill="currentColor"/>
         <circle cx="17" cy="14" r="2" fill="currentColor"/>
         <circle cx="21" cy="10" r="2" fill="currentColor"/>
       </svg>
     </div>
     
     {/* テキスト部分 */}
     <div>
       <div className="text-gray-800 font-black text-xl leading-none" style={{ letterSpacing: '0.02em' }}>
         瀧川指数
       </div>
       <div className="text-amber-600 text-[10px] font-bold tracking-wider">
         TAKIGAWA INDEX
       </div>
     </div>
   </div>
   ```

4. **サブナビゲーション**:
   - 背景: `bg-gray-200`
   - リンク: 中央競馬、地方競馬、G1レース、G2・G3、無料レース

### ホームページレイアウト
- **3カラム構成**: メインコンテンツ（2/3）+ サイドバー（1/3）
- **背景色**: `bg-gray-100`
- **コンテナ**: 白背景、グレーボーダー

### レース表示形式
- **テーブル形式**: ネット競馬風
- **グレード色分け**:
  - G1: `text-red-600 font-bold`
  - G2: `text-blue-600 font-bold`
  - G3: `text-green-600 font-bold`
  - OP: `text-purple-600`
- **芝/ダート色分け**:
  - 芝: `text-green-700`
  - ダート: `text-orange-700`

### カラースキーム
- プライマリ: アンバー (#f59e0b)
- LINE: #00B900
- 背景: グレー系
- テキスト: 黒/グレー系

### フォントサイズ
- ベース: 14px
- 見出し: 各セクションに応じて調整
- テーブル: `text-sm`

### 重要な設計決定
1. **枠なしロゴ**: シンプルにアイコン＋テキストのみ
2. **グラフアイコン**: 上昇トレンドを表す指数分析の象徴
3. **ネット競馬風テーブル**: 情報密度が高く見やすい表形式

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npm run type-check

# ビルド
npm run build

# 本番サーバー起動
npm start
```

## 管理機能の詳細

### レース管理 (`/admin/races`)
- **カテゴリ分類**: central（中央）、local（地方）、g1、g2g3、free（無料）
- **トップページ表示**: showOnTopフラグで制御、topOrderで順序指定
- **OCR/テキスト入力**: 画像またはテキストから自動でレース情報を抽出
- **瀧川指数計算**: 出走馬情報を基に自動計算（再計算も可能）

### お知らせ管理 (`/admin/notices`)
- **タイプ分類**: campaign（キャンペーン）、maintenance（メンテナンス）、update（アップデート）
- **NEW表示**: isNewフラグで制御
- **公開設定**: isPublishedフラグで即座に反映

### 特徴セクション管理 (`/admin/features`)
- **アイコン選択**: Trophy、TrendingUp、Users、Shield、Target、Zap、Star
- **順序変更**: 上下矢印で簡単に並び替え
- **公開設定**: トップページの「瀧川指数の特徴」セクションに反映

### トップページとの連携
- 管理画面で設定した内容は即座にトップページに反映
- レースはshowOnTop=trueかつisPublished=trueのものが表示
- お知らせはisPublished=trueのものが表示（最新3件）
- 特徴はisPublished=trueのものがorder順に表示