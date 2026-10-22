import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Owner sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <main className="adm-login">
      <div className="adm-login__card">
        <p className="adm-eyebrow">Calm Beauty Hub</p>
        <h1 className="adm-login__title">Owner sign in</h1>
        <p className="adm-muted">Sign in to log visits and check who has earned a reward.</p>
        <LoginForm />
      </div>
    </main>
  );
}
