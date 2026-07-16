"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2, Lock, User } from "lucide-react";
import { loginAction, type LoginFormState } from "@/lib/admin/auth-actions";
import { Logo } from "@/components/layout/Logo";

const initialState: LoginFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-mac-sky-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-mac-sky-600 disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      Entrar
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-airflow-gradient px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-4 text-xl font-bold text-mac-navy-800">
            Painel administrativo
          </h1>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
              Usuário
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="form-input pl-9"
                placeholder="usuário"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
              Senha
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="form-input pl-9"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state.error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
