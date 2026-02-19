import type { Metadata } from "next";
import LoginClient from "./ui/LoginClient";

export const metadata: Metadata = {
  title: "Login | Innovation Brindes",
  description: "Acesse sua conta para ver os produtos.",
};

export default function LoginPage() {
  return <LoginClient />;
}
