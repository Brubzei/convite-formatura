import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Convite para minha Colação de Grau",
  description: "19 de agosto de 2026, na Universidade Católica de Brasília — Campus Taguatinga.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
