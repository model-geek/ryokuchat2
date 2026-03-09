# RyokuChat

## セットアップ

```bash
# 依存関係のインストール
bun install

# Panda CSS のコード生成
bun run prepare

# 環境変数の設定
cp .env.example .env.local
# .env.local に DATABASE_URL を設定

# DB マイグレーション
bunx drizzle-kit migrate

# 開発サーバーの起動
bun dev
```
