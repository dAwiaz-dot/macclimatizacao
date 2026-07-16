import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Cliente Supabase "puro" (sem cookies/sessão), usado para leituras públicas
 * na landing page (produtos e portfólio). Por não depender de `cookies()`,
 * as páginas que o utilizam continuam elegíveis para geração estática (SSG)
 * e ISR — melhor para SEO e performance do que forçar renderização dinâmica
 * em toda requisição.
 */
export function createPublicClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
