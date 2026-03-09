# RyokuChat

## 技術スタック
- Next.js 16 (App Router) / React 19 / TypeScript (strict)
- Panda CSS + Park UI (Ark UI) / Drizzle ORM + PostgreSQL (Supabase)
- パッケージマネージャー: Bun / デプロイ: Vercel

## プロジェクト構造
src/app/           → App Router (pages, layouts, actions)
src/components/ui/ → Park UI コンポーネント (@park-ui/cli で生成)
src/db/            → Drizzle ORM (schema.ts, index.ts)
src/features/      → 機能ドメインごとの縦割り (VSA)
src/lib/           → 汎用ロジック (Feature 横断ユーティリティ)
styled-system/     → Panda CSS 生成コード (自動生成、編集禁止)

## パスエイリアス
@/* → ./src/*

## コマンド
- bun dev / bun run build / bun run lint
- bun run prepare → panda codegen
- bunx drizzle-kit generate / migrate
- bunx @park-ui/cli components add <name>

## 普遍的ルール
- Server Components をデフォルトとする。'use client' は必要最小限に
- useMemo / useCallback / React.memo を手動で書かない（React Compiler が自動最適化。next.config.ts で `reactCompiler: true` 設定済み）
- Tailwind CSS 禁止。スタイルは Panda CSS (css(), JSXパターン) を使用
- styled-system/ 配下は読み取り専用（panda codegen で再生成）
- proxy.ts を使用（middleware.ts は非推奨）
