import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";

export const metadata: Metadata = {
  title: "Login do painel administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (!isSupabaseConfigured) {
    return <SupabaseSetupNotice />;
  }

  return <LoginForm />;
}
