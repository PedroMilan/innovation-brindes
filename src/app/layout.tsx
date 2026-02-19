import type { Metadata } from "next";
import "@/styles/globals.css";
import QueryProvider from "@/shared/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Innovation Brindes",
  description: "Teste Frontend - Next.js + TypeScript + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
