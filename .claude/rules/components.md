---
paths:
  - src/components/**
---

# コンポーネント設計ルール

## ディレクトリ構造

```
src/components/
├── ui/          → Park UI 生成コンポーネント（カスタマイズ可）
└── ...          → プロジェクト固有コンポーネント
```

## Park UI コンポーネントの追加

```bash
bunx @park-ui/cli components add <name>
```

生成先は `src/components/ui/` に配置される。

## Props 定義

コンポーネントの Props は**型定義必須**。

```tsx
type CardProps = {
  title: string;
  children: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <Box p="4" rounded="sm">
      <Text fontWeight="bold">{title}</Text>
      {children}
    </Box>
  );
}
```

## React Compiler

React Compiler が有効化されているため、以下を**手動で書かない**:
- `useMemo`
- `useCallback`
- `React.memo`

コンパイラが自動的に最適化を行う。
