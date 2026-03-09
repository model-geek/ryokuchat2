---
paths:
  - src/features/**
  - src/lib/**
---

# Feature-Based Vertical Slice Architecture (VSA)

## Feature の標準構造

```
src/features/<feature-name>/
├── components/   → 機能専用 UI。'use client' はここに閉じる
├── actions.ts    → "use server" 必須。データの書き込み・更新 (Command)
├── queries.ts    → データの読み取り (Query)。"use cache" を関数単位で使用
└── schema.ts     → Zod バリデーションスキーマ
```

## ルール

### Feature 間のデータ更新の分離

- 原則として、他 Feature のデータベーステーブルを直接更新（INSERT / UPDATE / DELETE）してはいけない
- 他 Feature のデータを変更したい場合は、対象 Feature の `actions.ts` を呼び出す

### トランザクション特例（CASCADE の禁止）

- `ON DELETE CASCADE` 等の暗黙の連鎖に依存しない。関連データの削除・更新はコード上で明示的に記述する
- 複数テーブル更新で ACID トランザクションが不可欠な場合に限り、ビジネスの主体となる Feature 内で他 Feature のテーブルを直接更新（`db.transaction()` 等）することを許可する
- この特例を適用する場合は、該当コードの直前に以下のコメントを必ず記述する:

```ts
// [CROSS-FEATURE-MUTATION]: 理由
// 例: ユーザー退会に伴う関連プロジェクトの同時削除
```

### Query の柔軟性

- `queries.ts`（読み取り）では、画面表示のための JOIN 等で他 Feature のテーブルを直接参照してよい

### Server / Client 境界

- `actions.ts` はファイル先頭に `"use server"` を宣言し、サーバーサイドに閉じる
- `queries.ts` は Server Component から直接呼び出す。Client Component からは呼ばない
- `'use client'` は `components/` 内のファイルに分離する

### 設計方針

- 「コードを読めば何が起きるか予測できるか」「機能ディレクトリごと安全に削除できるか」を判断基準とする
- 実装の揺れは許容するが、Feature の境界は越えない
- `src/lib/` には Feature 横断のユーティリティのみ配置する
