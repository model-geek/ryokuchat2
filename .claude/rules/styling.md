---
paths:
  - "**/*.tsx"
---

# Panda CSS & Park UI スタイリングルール

## Panda CSS の使い方

### `css()` 関数
```tsx
import { css } from "../../styled-system/css";

<div className={css({ display: "flex", gap: "4", p: "2" })}>
```

### JSX パターン
```tsx
import { Box, Flex, HStack, VStack } from "../../styled-system/jsx";

<Flex gap="4" p="2">
  <Box flex="1">コンテンツ</Box>
</Flex>
```

### `cva()` でバリアント定義
```tsx
import { cva } from "../../styled-system/css";

const button = cva({
  base: { px: "4", py: "2", rounded: "sm" },
  variants: {
    visual: {
      solid: { bg: "green.500", color: "white" },
      outline: { border: "1px solid", borderColor: "green.500" },
    },
  },
});
```

## インポートパス

`styled-system/` は `src/` 外のプロジェクトルートにある。TSX ファイルからは**相対パス**でインポートする。

```tsx
// src/app/page.tsx からの例
import { css } from "../../styled-system/css";
import { Flex } from "../../styled-system/jsx";
```

## Park UI

- コンポーネント追加: `bunx @park-ui/cli components add <name>`
- 生成先: `src/components/ui/`
- 生成されたコンポーネントはカスタマイズ可能

## デザイントークン
- アクセントカラー: `green`
- グレースケール: `sage`
- 角丸: `sm`

## 禁止事項
- **Tailwind CSS のユーティリティクラスを使用しない** (`className="flex gap-4"` など)
- **`styled-system/` 配下を直接編集しない** — `panda codegen` で再生成される
