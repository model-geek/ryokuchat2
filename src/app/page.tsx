import { css } from "../../styled-system/css";
import { logout } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

/** トップページ */
export default function Home() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6",
        minH: "screen",
      })}
    >
      <h1
        className={css({
          fontSize: "3xl",
          fontWeight: "bold",
        })}
      >
        RyokuChat
      </h1>
      <form action={logout}>
        <Button type="submit" variant="outline">
          ログアウト
        </Button>
      </form>
    </div>
  );
}
