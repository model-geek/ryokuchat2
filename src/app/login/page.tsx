import { css } from "../../../styled-system/css";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minH: "screen",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "6",
          w: "full",
          maxW: "sm",
          p: "8",
        })}
      >
        <h1
          className={css({
            fontSize: "3xl",
            fontWeight: "bold",
            textAlign: "center",
          })}
        >
          RyokuChat
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
