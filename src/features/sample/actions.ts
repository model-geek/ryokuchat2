"use server";

import type { SampleInput } from "./schema";

/**
 * サンプル: データ書き込みアクション
 * 実際の Feature では db への INSERT/UPDATE をここに記述する
 */
export async function createSample(input: SampleInput) {
  console.log("createSample called with:", input);
}
