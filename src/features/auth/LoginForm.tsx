"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "./auth.api";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { IconLock, IconUser } from "@/components/icons";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm() {
  const router = useRouter();
  const { remember, setRemember, loginSuccess } = useAuthStore();

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const data = await loginRequest({ email, senha });
      loginSuccess({
        token: data.token_de_acesso,
        nome: data.dados_usuario.nome_usuario,
      });
      router.replace("/produtos");
    } catch (err: any) {
      const httpStatus = err?.response?.status;
      const apiStatus = err?.apiStatus;

      if (apiStatus === 0) {
        setErrorMsg(err?.message || "Erro ao autenticar.");
      } else if (!err?.response || httpStatus === 0) {
        setErrorMsg(
          "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
        );
      } else {
        setErrorMsg(
          err?.message || "Credenciais inválidas. Verifique e tente novamente.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="space-y-4">
        <Input
          placeholder="Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<IconUser />}
          autoComplete="username"
          required
        />
        <Input
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          leftIcon={<IconLock />}
          type="password"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between px-1">
          <Checkbox
            checked={remember}
            onChange={setRemember}
            label={<span className="text-white/90">Manter logado</span>}
          />
          <a href="#" className="text-xs text-white/90 hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        {errorMsg ? (
          <div
            role="alert"
            className="rounded-xl bg-white/90 p-3 text-xs text-red-700"
          >
            {errorMsg}
          </div>
        ) : null}

        <div className="flex justify-center pt-1">
          <Button
            type="submit"
            disabled={loading}
            className="min-w-[180px] bg-white text-black hover:bg-white/95"
          >
            {loading ? "Entrando..." : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
}
