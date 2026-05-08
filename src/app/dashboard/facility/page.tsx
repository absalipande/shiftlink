"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";

export default function FacilityDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }
    if (!loading && user?.type !== "facility") {
      router.replace("/board");
    }
  }, [loading, router, user]);

  if (loading || !user || user.type !== "facility") {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="text-4xl leading-tight">Facility Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Signed in as {user.name}. This page is intentionally scoped as a placeholder for the take-home.</p>

      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-2xl">Next backend step</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">With a production backend, this view would include facility shift posting, status tracking, and fulfillment analytics.</p>
      </section>

      <div className="mt-8 flex items-center gap-3">
        <Link href="/" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          Home
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}
