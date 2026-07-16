import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Cliente Supabase para uso em Server Components, Server Actions e Route
 * Handlers. Lê/grava a sessão através dos cookies da requisição.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // `setAll` chamado a partir de um Server Component sem permissão
          // para escrever cookies — seguro ignorar quando o middleware já
          // cuida da renovação da sessão.
        }
      },
    },
  });
}
