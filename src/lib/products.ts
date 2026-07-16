import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type Product = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  created_at: string;
};

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar produto:", error.message);
    return null;
  }

  return data;
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  return Array.from(new Set(products.map((product) => product.category))).sort();
}
