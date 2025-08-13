# UIデザインバックアップ (2024-01-13)

このディレクトリには、2024年1月13日に完成したネット競馬風UIデザインのバックアップが保存されています。

## バックアップファイル

- `Header.tsx` - ヘッダーコンポーネント（ロゴ、ナビゲーション）
- `Footer.tsx` - フッターコンポーネント
- `index.tsx` - ホームページ（レース一覧、サイドバー）
- `globals.css` - グローバルスタイル

## 重要なデザイン要素

### ロゴデザイン
- アイコン: 上昇トレンドを表すグラフ（オレンジ色）
- テキスト: 「瀧川指数」（黒）+ 「TAKIGAWA INDEX」（オレンジ）
- 枠線なし、シンプルなデザイン

### カラースキーム
- プライマリ: アンバー (#f59e0b)
- 背景: グレー系
- G1: 赤、G2: 青、G3: 緑

## 復元方法

UIが崩れた場合は、このディレクトリから該当ファイルをコピーして復元してください：

```bash
cp backup/2024-01-13-ui-complete/Header.tsx components/Layout/
cp backup/2024-01-13-ui-complete/Footer.tsx components/Layout/
cp backup/2024-01-13-ui-complete/index.tsx pages/
cp backup/2024-01-13-ui-complete/globals.css styles/
```