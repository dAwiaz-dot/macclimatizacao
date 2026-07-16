"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminPassword, adminUsername, isAuthConfigured } from "./env";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "./session";

export type LoginFormState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  if (!isAuthConfigured) {
    return { error: "O login ainda não foi configurado no servidor." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username !== adminUsername || password !== adminPassword) {
    return { error: "Usuário ou senha inválidos. Tente novamente." };
  }

  const token = await createSessionToken();
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);
  redirect("/admin");
}

export async function signOutAction() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}
