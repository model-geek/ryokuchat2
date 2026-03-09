import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * サーバー用の Supabase クライアントを生成する
 *
 * @remarks
 * Server Component・Server Action から Supabase にアクセスする場合に使用する。
 * Cookie ストアを通じてセッションの読み書きを行う。
 *
 * @returns Supabase サーバークライアント
 *
 * @example
 * ```ts
 * const supabase = await createClient();
 * const { data: { user } } = await supabase.auth.getUser();
 * ```
 *
 * @public
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    },
  );
}
