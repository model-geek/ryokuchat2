# RyokuChat

## セットアップ

```bash
# 依存関係のインストール (prepare で panda codegen も実行される)
bun install

# 環境変数の取得 (Vercel にリンク済みであること)
vercel env pull .env.local

# DB マイグレーション
bunx drizzle-kit migrate

# 開発サーバーの起動
bun dev
```
