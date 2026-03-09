---
paths:
  - src/db/**
  - migrations/**
---

# データベースルール (Drizzle ORM + PostgreSQL)

## スキーマ規約

- `pgTable` で定義
- id は `uuid` 型、デフォルト値付き
- 全テーブルに `createdAt` / `updatedAt` カラムを含める
- カラム名は**スネークケース**

```tsx
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

## DB 接続

`src/db/index.ts` でシングルトン接続をエクスポート。

```tsx
import { db } from "@/db";
```

## マイグレーション

```bash
bunx drizzle-kit generate  # マイグレーションファイル生成
bunx drizzle-kit migrate   # マイグレーション実行
```

## アクセス制御

- DB クエリは **Server Component** または **Server Action** 内でのみ実行
- Client Component から直接 DB にアクセスしない
