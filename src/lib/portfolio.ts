import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string | null;
  service_date: string | null;
  image_url: string;
  created_at: string;
};

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar item de portfólio:", error.message);
    return null;
  }

  return data;
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar portfólio:", error.message);
    return [];
  }

  return data ?? [];
}
