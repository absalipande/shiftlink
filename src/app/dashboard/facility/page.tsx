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
    <main className="mx-auto min-h-screen w-full max-w-6xl bg-background px-5 py-5 md:px-8 md:py-7">
      <header className="mb-10 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-[-0.03em] md:text-[1.55rem]">
          ShiftLink
        </Link>
        <div className="flex items-center gap-2 text-[0.82rem] md:gap-3">
          <Link
            href="/"
            className="rounded-full border border-border px-4 py-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Log Out
          </button>
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Facility Workspace
          </p>
          <h1 className="mt-4 max-w-2xl text-[2.75rem] leading-[0.98] tracking-[-0.055em] md:text-[4rem]">
            Manage urgent coverage from one quiet board.
          </h1>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-muted-foreground md:text-[1.02rem]">
            Signed in as {user.name}. This placeholder shows how the facility side would organize
            open posts, fulfillment status, and coverage performance.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Open
            </p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em]">8</p>
            <p className="mt-1 text-[0.76rem] text-muted-foreground">Coverage needs</p>
          </article>
          <article className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Filled
            </p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em]">21</p>
            <p className="mt-1 text-[0.76rem] text-muted-foreground">This month</p>
          </article>
          <article className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Avg. Fill
            </p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em]">47m</p>
            <p className="mt-1 text-[0.76rem] text-muted-foreground">Mock metric</p>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-3xl border border-border bg-card/80 p-5 shadow-[0_18px_60px_rgba(35,35,25,0.04)] md:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            Create Coverage Request
          </p>
          <h2 className="mt-3 text-[1.85rem] leading-tight tracking-[-0.045em]">
            Post an urgent shift.
          </h2>
          <p className="mt-2 text-[0.9rem] leading-6 text-muted-foreground">
            This is a visual placeholder for the next backend step. In production, the facility
            would create a shift and send it to the professional board.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[0.82rem] font-medium text-foreground/85">Role needed</p>
              <div className="rounded-xl border border-border bg-background/70 px-3 py-3 text-[0.9rem] text-muted-foreground">
                RN, LPN, CNA...
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[0.82rem] font-medium text-foreground/85">Target date</p>
              <div className="rounded-xl border border-border bg-background/70 px-3 py-3 text-[0.9rem] text-muted-foreground">
                Select date
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[0.82rem] font-medium text-foreground/85">Shift window</p>
              <div className="rounded-xl border border-border bg-background/70 px-3 py-3 text-[0.9rem] text-muted-foreground">
                7:00 AM - 3:00 PM
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[0.82rem] font-medium text-foreground/85">Rate</p>
              <div className="rounded-xl border border-border bg-background/70 px-3 py-3 text-[0.9rem] text-muted-foreground">
                $62/hr
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 h-11 rounded-full bg-primary px-5 text-[0.88rem] font-medium text-primary-foreground opacity-80"
          >
            Mock Post Shift
          </button>
        </article>

        <article className="rounded-3xl border border-border bg-card/80 p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                Coverage Pipeline
              </p>
              <h2 className="mt-3 text-[1.85rem] leading-tight tracking-[-0.045em]">
                Today’s staffing view
              </h2>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-medium text-primary">
              Demo only
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {[
              [
                "RN · North Harbor Medical",
                "May 12 · 7:00 AM - 3:00 PM",
                "Matched",
                "bg-primary/10 text-primary",
              ],
              [
                "LPN · Mapleview Senior Care",
                "May 12 · 3:00 PM - 11:00 PM",
                "Reviewing",
                "bg-secondary text-muted-foreground",
              ],
              [
                "CNA · Riverside Recovery",
                "May 13 · 7:00 AM - 7:00 PM",
                "Open",
                "bg-primary/10 text-primary",
              ],
            ].map(([title, meta, status, statusClass]) => (
              <div key={title} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.95rem] font-semibold tracking-[-0.02em]">{title}</p>
                    <p className="mt-1 text-[0.8rem] text-muted-foreground">{meta}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[0.68rem] font-medium ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-4 rounded-3xl border border-border bg-card/70 p-5 md:p-6">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
          Next Backend Step
        </p>
        <h2 className="mt-3 text-[1.65rem] leading-tight tracking-[-0.045em]">
          Connect facility shift posting to the professional board.
        </h2>
        <p className="mt-2 max-w-3xl text-[0.92rem] leading-6 text-muted-foreground">
          With a production backend, this view would include authenticated shift creation, status
          tracking, fulfillment analytics, and notifications when a professional claims a posted
          shift.
        </p>
      </section>
    </main>
  );
}
