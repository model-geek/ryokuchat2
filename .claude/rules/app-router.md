---
paths:
  - src/app/**
---

# App Router & Next.js 16 ルール

## ファイル規約
- `page.tsx` — ルートの UI
- `layout.tsx` — 共有レイアウト
- `loading.tsx` — Suspense フォールバック
- `error.tsx` — エラー境界（`'use client'` 必須）
- `not-found.tsx` — 404 UI

## params / searchParams は Promise

Next.js 16 では `params` と `searchParams` は **Promise** になった。必ず `await` すること。

```tsx
// ✅ 正しい
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>{id}</div>;
}

// ❌ 間違い — await なしで直接アクセス
export default function Page({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
```

## Server Actions

- `"use server"` をファイル先頭またはインライン関数に宣言
- データ変更後は `updateTag(tag)` でキャッシュ即時無効化（read-your-own-writes）

```tsx
"use server";

import { updateTag } from "next/cache";

export async function createPost(formData: FormData) {
  // ... DB 書き込み
  updateTag("posts"); // 即時無効化
}
```

## キャッシュ制御

### `"use cache"` ディレクティブ
`next.config.ts` で `cacheComponents: true` を設定済み。関数やコンポーネントの先頭に宣言してキャッシュ対象にする。

```tsx
async function getUser(id: string) {
  "use cache";
  cacheTag(`user-${id}`);
  cacheLife("hours");
  return db.query.users.findFirst({ where: eq(users.id, id) });
}
```

### API 一覧
| 関数 | 用途 | 備考 |
|------|------|------|
| `cacheTag(...tags)` | キャッシュにタグ付け | `"use cache"` 内で使用 |
| `cacheLife(profile)` | 有効期間を指定 | プリセット: `seconds`, `minutes`, `hours`, `days`, `weeks`, `max` |
| `updateTag(tag)` | 即時無効化 | Server Action 内。read-your-own-writes |
| `revalidateTag(tag, profile)` | バックグラウンド再検証 | **第2引数 (profile) 必須** |
| `refresh()` | クライアント動的データをリフレッシュ | Server Action 内で使用 |

### インポート
```tsx
import { cacheTag, cacheLife, updateTag, revalidateTag } from "next/cache";
```

## Server / Client 境界

- Server Components をデフォルトとする
- `'use client'` はインタラクティブなツリーの**末端**に配置
- Client Component から Server Component を children として渡すのは OK
