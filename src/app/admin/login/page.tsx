import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { isAuthConfigured } from "@/lib/admin/env";
import { AdminSetupNotice } from "@/components/admin/AdminSetupNotice";

export const metadata: Metadata = {
  title: "Login do painel administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (!isAuthConfigured) {
    return <AdminSetupNotice />;
  }

  return <LoginForm />;
}
