import type { Metadata } from "next";
import "./globals.css";

/** アプリケーション全体のメタデータ */
export const metadata: Metadata = {
  title: "RyokuChat",
  description: "RyokuChat",
};

/**
 * アプリケーション全体を囲むルートレイアウト
 *
 * @remarks
 * `<html lang="ja">` を設定し、グローバル CSS を読み込む。
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
