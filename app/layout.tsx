import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: ["500", "400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto Passos Mágicos",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
