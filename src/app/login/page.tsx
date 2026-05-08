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
    const accountType = values.email.toLowerCase() === "pro@shiftlink.com" ? "professional" : "facility";
    router.push(accountType === "professional" ? "/board" : "/dashboard/facility");
  };

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
        Back to ShiftLink
      </Link>
      <h1 className="mt-6 text-4xl leading-tight">Sign in</h1>
      <p className="mt-2 text-muted-foreground">Use one of the two test accounts from the README.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input id="email" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("email")} />
          {form.formState.errors.email && <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input id="password" type="password" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("password")} />
          {form.formState.errors.password && <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>}
        </div>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button type="submit" className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
          Sign In
        </button>
      </form>
    </main>
  );
}
