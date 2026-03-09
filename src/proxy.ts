import { updateSession } from "@/lib/supabase/proxy";
import type { NextRequest } from "next/server";

/**
 * Next.js のリクエストプロキシ（`middleware.ts` の代替）
 *
 * @remarks
 * すべてのリクエストを {@link updateSession} に委譲し、
 * Supabase セッションの更新と認証リダイレクトを行う。
 *
 * @param request - Next.js のリクエストオブジェクト
 * @returns セッション処理済みのレスポンス
 *
 * @public
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

/**
 * プロキシの対象パスを定義するマッチャー設定
 *
 * @remarks
 * `_next/static`、`_next/image`、`favicon.ico` を除く
 * すべてのパスがプロキシ対象となる。
 */
export const config = {
  matcher: [
    /*
     * 以下で始まるパスを除外:
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
