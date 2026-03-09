---
paths:
  - src/**
---

# TSDoc 記述規約

IntelliSense のホバー表示だけで使い方がわかる、OSS 品質の TSDoc を目指す。

## 基本方針

- `export` されたすべての関数・型・定数に TSDoc を記述する
- 日本語で記述する
- 型注釈は TypeScript が提供するため、TSDoc 内で型を重複して書かない

## TSDoc の構造

```ts
/**
 * 概要（1行目）
 *
 * @remarks
 * 補足説明、背景、制約など。
 * 関連する型や関数は {@link SomeType} で参照する。
 *
 * @param name - パラメータの説明
 * @returns 戻り値の説明
 *
 * @example 基本的な使い方
 * ```ts
 * const result = myFunction("hello");
 * ```
 *
 * @example エラーハンドリング
 * ```ts
 * try {
 *   myFunction("");
 * } catch (e) {
 *   console.error(e);
 * }
 * ```
 *
 * @throws {@link ValidationError} 入力が不正な場合
 *
 * @public
 */
```

### 各タグの使い方

| タグ | 用途 | 備考 |
|------|------|------|
| 概要（1行目） | 関数・型の目的を1行で | `@summary` は不要 |
| `@remarks` | 補足説明、背景、制約 | `{@link}` で関連要素を参照 |
| `@param name - 説明` | パラメータ | 型は書かない |
| `@returns` | 戻り値 | `void` の場合は省略可 |
| `@example タイトル` | 使用例 | **積極的に複数ユースケースを記述する** |
| `@throws {@link Error}` | 例外 | エラー型を `{@link}` で指定 |
| `@defaultValue` | デフォルト値 | オプショナルパラメータに |

## 可視性タグ

| タグ | 用途 |
|------|------|
| `@public` | 公開 API。Feature 外から利用される |
| `@internal` | 内部用。他 Feature から使わない |
| `@alpha` | 実験的。破壊的変更の可能性あり |
| `@beta` | テスト中。API は安定に近い |

## Markdown の活用

TSDoc 内で Markdown を積極的に使う:

- **太字** で重要な制約を強調
- `` `インラインコード` `` で値やキー名を記述
- リストで条件や手順を整理
- `{@link}` で関連する型・関数へのリンク

## 書かなくてよいケース

- **React コンポーネントの Props 型** — 各プロパティが自明な場合（`label`, `onClick` 等）
- **Zod スキーマ** — バリデーションメッセージが自己記述的
- **re-export のみのバレルファイル** — `index.ts` での再エクスポート

## コード例

### ✅ 正しい例

```ts
/**
 * ユーザー名のバリデーションを行う
 *
 * @remarks
 * - 先頭・末尾の空白は自動でトリムされる
 * - バリデーションルールは {@link USERNAME_RULES} を参照
 *
 * @param username - 検証対象のユーザー名
 * @returns トリム済みのユーザー名
 *
 * @example 正常系
 * ```ts
 * const name = validateUsername("  alice  ");
 * // => "alice"
 * ```
 *
 * @example バリデーションエラー
 * ```ts
 * validateUsername(""); // throws ValidationError
 * validateUsername("a".repeat(51)); // throws ValidationError
 * ```
 *
 * @throws {@link ValidationError} ユーザー名が空または50文字超の場合
 *
 * @public
 */
export function validateUsername(username: string): string {
  // ...
}
```

### ❌ 間違った例

```ts
// NG: 型情報を重複して記述している
/**
 * @param username - string 型のユーザー名
 * @returns string 型のトリム済みユーザー名
 */

// NG: 概要のみで @example がない
/**
 * ユーザー名のバリデーションを行う
 */

// NG: 英語混在
/**
 * Validate username
 * @param username - ユーザー名
 */
```
