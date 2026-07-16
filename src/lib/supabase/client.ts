import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Cliente Supabase para uso em Client Components (ex.: formulários do
 * painel admin que rodam no navegador).
 */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
