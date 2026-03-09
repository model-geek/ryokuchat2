"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Field from "@/components/ui/field";
import { css } from "../../../../styled-system/css";
import { type LoginState, login } from "../actions";

const initialState: LoginState = {};

/**
 * メール/パスワードのログインフォーム
 *
 * @remarks
 * - {@link login} Server Action を `useActionState` で呼び出す
 * - バリデーションエラーはフォーム内にインライン表示
 * - 送信中はボタンを無効化し「ログイン中...」を表示
 *
 * @public
 */
export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className={css({ display: "flex", flexDirection: "column", gap: "4" })}
    >
      <Field.Root>
        <Field.Label>メールアドレス</Field.Label>
        <Input name="email" type="email" placeholder="test@example.com" />
      </Field.Root>

      <Field.Root>
        <Field.Label>パスワード</Field.Label>
        <Input name="password" type="password" />
      </Field.Root>

      {state.error && (
        <p className={css({ color: "red.500", textStyle: "sm" })}>
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} width="full">
        {pending ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  );
}
