import { css } from "../../styled-system/css";

export default function Home() {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
    </div>
  );
}
