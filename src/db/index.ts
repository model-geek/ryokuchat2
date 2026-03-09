import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);

/**
 * Drizzle ORM のデータベースインスタンス
 *
 * @remarks
 * `DATABASE_URL` 環境変数で接続先を指定する。
 * スキーマは {@link schema} から自動で読み込まれる。
 *
 * @example
 * ```ts
 * import { db } from "@/db";
 * const users = await db.query.users.findMany();
 * ```
 *
 * @public
 */
export const db = drizzle(client, { schema });
