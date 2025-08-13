# 瀧川指数 - Takigawa Index

元地方競馬騎手・瀧川寿樹也氏監修の競馬予想サイト

## 技術スタック

- **Frontend**: Next.js 14.2.31, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: NextAuth.js + LINE Login
- **Payment**: Stripe
- **AI**: Claude API (OCR・テキスト解析)

## セットアップ

### 必要な環境

- Node.js 18以上
- PostgreSQL
- LINE Developers アカウント
- Stripe アカウント
- Claude API キー

### インストール

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# .envファイルを編集して必要な値を設定

# データベースのマイグレーション
npx prisma migrate dev

# 開発サーバーの起動
npm run dev
```

### ビルド

```bash
# 型チェック
npm run type-check

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start
```

## 主な機能

- LINE認証（友達追加必須）
- ポイント制レース閲覧システム
- OCR/テキスト解析による管理者向けレース入力
- 瀧川指数による独自の競馬予想
- レスポンシブデザイン（ネット競馬風UI）

## ライセンス

Proprietary - All Rights Reserved