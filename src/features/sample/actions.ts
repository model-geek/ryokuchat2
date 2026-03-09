"use server";

import type { SampleInput } from "./schema";

/**
 * サンプルデータを作成する Server Action
 *
 * @remarks
 * スキャフォールド用のスタブ実装。
 * 実際の Feature では DB への INSERT/UPDATE に置き換える。
 *
 * @param input - {@link SampleInput} スキーマでバリデーション済みの入力
 *
 * @example
 * ```tsx
 * const validated = sampleSchema.parse(formData);
 * await createSample(validated);
 * ```
 *
 * @alpha
 */
export async function createSample(input: SampleInput) {
  console.log("createSample called with:", input);
}
