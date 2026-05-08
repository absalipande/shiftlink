"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/components/auth-provider";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!loading && user) {
      router.replace(user.type === "professional" ? "/board" : "/dashboard/facility");
    }
  }, [loading, router, user]);

  const onSubmit = (values: LoginFormValues) => {
    const result = login(values.email, values.password);
    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }
    setErrorMessage(null);
    const accountType =
      values.email.toLowerCase() === "pro@shiftlink.com" ? "professional" : "facility";
    router.push(accountType === "professional" ? "/board" : "/dashboard/facility");
  };

  return (
    <main className="min-h-screen px-5 py-6 md:px-8 md:py-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-[-0.03em] md:text-[1.55rem]">
            ShiftLink
          </Link>
          <Link
            href="/signup"
            className="rounded-full border border-border px-4 py-2 text-[0.82rem] font-medium text-foreground transition hover:bg-secondary"
          >
            Sign Up
          </Link>
        </header>

        <section className="grid min-h-[calc(100vh-96px)] items-center gap-10 py-10 md:grid-cols-[0.95fr_1.05fr] md:py-12">
          <div className="max-w-xl">
            <Link
              href="/"
              className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground transition hover:text-foreground"
            >
              Back to ShiftLink
            </Link>
            <h1 className="mt-6 text-[2.8rem] leading-[0.98] tracking-[-0.055em] md:text-[4.1rem]">
              Welcome back to <span className="text-primary">ShiftLink</span>.
            </h1>
            <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-muted-foreground md:text-[1.02rem]">
              Sign in with a test account to continue to the professional shift board or the facility dashboard.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card/65 p-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Professional Demo</p>
                <p className="mt-3 text-[0.9rem] font-semibold">pro@shiftlink.com</p>
                <p className="mt-1 text-[0.78rem] text-muted-foreground">Browse and claim open shifts.</p>
              </article>
              <article className="rounded-2xl border border-border bg-card/65 p-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Facility Demo</p>
                <p className="mt-3 text-[0.9rem] font-semibold">facility@shiftlink.com</p>
                <p className="mt-1 text-[0.78rem] text-muted-foreground">Manage coverage requests.</p>
              </article>
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-[29rem] rounded-3xl border border-border bg-card/80 p-5 shadow-[0_24px_80px_rgba(35,35,25,0.06)] md:p-6"
          >
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Account Access</p>
              <h2 className="mt-3 text-[1.85rem] leading-tight tracking-[-0.045em]">Sign in</h2>
              <p className="mt-2 text-[0.9rem] leading-6 text-muted-foreground">
                Use either demo account from the README. The password must be at least 8 characters.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[0.82rem] font-medium text-foreground/85">
                  Email
                </label>
                <input
                  id="email"
                  className="h-11 w-full rounded-xl border border-input bg-background/70 px-3 text-[0.92rem] outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="pro@shiftlink.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-[0.78rem] text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-[0.82rem] font-medium text-foreground/85">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="h-11 w-full rounded-xl border border-input bg-background/70 px-3 text-[0.92rem] outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="Enter demo password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-[0.78rem] text-red-600">{form.formState.errors.password.message}</p>
                )}
              </div>
            </div>

            {errorMessage && (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[0.82rem] text-red-700">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 h-11 w-full rounded-full bg-primary px-4 text-[0.88rem] font-medium text-primary-foreground transition hover:opacity-90"
            >
              Sign In
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
