"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { loginSchema } from "./schema";

/**
 * {@link login} アクションの状態
 *
 * @remarks
 * `useActionState` のステートとして使用する。
 * `error` が存在する場合、フォームにエラーメッセージを表示する。
 *
 * @public
 */
export type LoginState = {
  error?: string;
};

/**
 * メール/パスワードでログインする Server Action
 *
 * @remarks
 * - バリデーションは {@link loginSchema} で実施
 * - 認証成功時は `/` にリダイレクトする
 *
 * @param _prevState - 前回の状態（`useActionState` が自動で渡す）
 * @param formData - フォームの送信データ（`email`, `password`）
 * @returns エラーがあれば `error` を含む {@link LoginState}
 *
 * @example
 * ```tsx
 * const [state, formAction] = useActionState(login, {});
 * <form action={formAction}>...</form>
 * ```
 *
 * @public
 */
export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "メールアドレスまたはパスワードが正しくありません" };
  }

  redirect("/");
}

/**
 * ログアウトして `/login` にリダイレクトする Server Action
 *
 * @example
 * ```tsx
 * <form action={logout}>
 *   <button type="submit">ログアウト</button>
 * </form>
 * ```
 *
 * @public
 */
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
