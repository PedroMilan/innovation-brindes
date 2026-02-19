"use client";

import * as React from "react";
import Image from "next/image";
import LoginForm from "@/features/auth/LoginForm";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const auth = useAuthStore();

  React.useEffect(() => {
    auth.hydrate();
  }, []);

  React.useEffect(() => {
    if (auth.token) router.replace("/produtos");
  }, [auth.token, router]);

  return (
    <main className="min-h-screen">
      <div className="relative min-h-screen">
        {/* Background image (right) */}
        <div className="absolute inset-0">
          <Image
            src="/login-bg.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
          <div className="w-full">
            <h1 className="mb-6 text-center text-xl font-semibold text-brand-700 md:text-2xl">
              Bem-vindo a Innovation Brindes
            </h1>

            <div className="mx-auto w-full max-w-xl rounded-2xl bg-brand-500 p-8 shadow-lg">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
