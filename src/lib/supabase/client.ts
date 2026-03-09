import { createBrowserClient } from "@supabase/ssr";

/**
 * ブラウザ用の Supabase クライアントを生成する
 *
 * @remarks
 * Client Component から Supabase にアクセスする場合に使用する。
 * 環境変数 `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` が必要。
 *
 * @returns Supabase ブラウザクライアント
 *
 * @example
 * ```ts
 * const supabase = createClient();
 * const { data } = await supabase.auth.getSession();
 * ```
 *
 * @public
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
