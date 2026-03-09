# RyokuChat

## セットアップ

```bash
# 依存関係のインストール
bun install

# Panda CSS のコード生成
bun run prepare

# 環境変数の取得 (Vercel にリンク済みであること)
vercel env pull .env.local

# DB マイグレーション
bunx drizzle-kit migrate

# 開発サーバーの起動
bun dev
```
