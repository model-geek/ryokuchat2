import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Supabase セッションを更新し、認証状態に応じてリダイレクトする
 *
 * @remarks
 * {@link proxy} から呼び出される。リクエストごとにセッショントークンをリフレッシュし、
 * 以下のリダイレクトルールを適用する:
 * - **未認証 & `/login` 以外** → `/login` にリダイレクト
 * - **認証済み & `/login`** → `/` にリダイレクト
 *
 * @param request - Next.js のリクエストオブジェクト
 * @returns セッション Cookie を更新済みのレスポンス、またはリダイレクトレスポンス
 *
 * @internal
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 未認証 & /login 以外 → /login にリダイレクト
  if (!user && pathname !== "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 認証済み & /login → / にリダイレクト
  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
