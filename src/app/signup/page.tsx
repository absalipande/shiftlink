"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const professionalSchema = z.object({
  userType: z.literal("professional"),
  fullName: z.string().min(2),
  email: z.email(),
  role: z.string().min(2),
  licenseState: z.string().min(2),
});

const facilitySchema = z.object({
  userType: z.literal("facility"),
  facilityName: z.string().min(2),
  email: z.email(),
  contactName: z.string().min(2),
  city: z.string().min(2),
});

const signupSchema = z.discriminatedUnion("userType", [professionalSchema, facilitySchema]);

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [submitted, setSubmitted] = useState<SignupValues | null>(null);
  const [userType, setUserType] = useState<"professional" | "facility">("professional");
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: "professional",
      fullName: "",
      email: "",
      role: "",
      licenseState: "",
    },
  });
  const errors = form.formState.errors;

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type === "facility") {
      switchType("facility");
    }
  }, []);

  const onSubmit = (values: SignupValues) => setSubmitted(values);

  const switchType = (nextType: "professional" | "facility") => {
    setUserType(nextType);
    form.reset(
      nextType === "professional"
        ? { userType: "professional", fullName: "", email: "", role: "", licenseState: "" }
        : { userType: "facility", facilityName: "", email: "", contactName: "", city: "" },
    );
    setSubmitted(null);
  };

  return (
    <main className="min-h-screen px-5 py-6 md:px-8 md:py-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-[-0.03em] md:text-[1.55rem]">
            ShiftLink
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-border px-4 py-2 text-[0.82rem] font-medium text-foreground transition hover:bg-secondary"
          >
            Log In
          </Link>
        </header>

        <section className="grid min-h-[calc(100vh-96px)] items-center gap-10 py-10 md:grid-cols-[0.92fr_1.08fr] md:py-12">
          <div className="max-w-xl">
            <Link
              href="/"
              className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground transition hover:text-foreground"
            >
              Back to ShiftLink
            </Link>
            <h1 className="mt-6 text-[2.75rem] leading-[0.98] tracking-[-0.055em] md:text-[4rem]">
              Create the right account for your <span className="text-primary">shift flow</span>.
            </h1>
            <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-muted-foreground md:text-[1.02rem]">
              Choose whether you are claiming shifts as a healthcare professional or posting
              coverage needs for a facility.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card/65 p-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Professional Path
                </p>
                <p className="mt-3 text-[0.9rem] font-semibold">Browse flexible shifts</p>
                <p className="mt-1 text-[0.78rem] leading-5 text-muted-foreground">
                  Create a profile with only the details needed to match open roles.
                </p>
              </article>
              <article className="rounded-2xl border border-border bg-card/65 p-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Facility Path
                </p>
                <p className="mt-3 text-[0.9rem] font-semibold">Post urgent coverage</p>
                <p className="mt-1 text-[0.78rem] leading-5 text-muted-foreground">
                  Register the facility contact details needed to coordinate coverage.
                </p>
              </article>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[34rem]">
            <div className="mb-4 inline-flex rounded-full border border-border bg-card/60 p-1">
              <button
                type="button"
                onClick={() => switchType("professional")}
                className={`rounded-full px-4 py-2 text-[0.82rem] font-medium transition ${
                  userType === "professional"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Professional
              </button>
              <button
                type="button"
                onClick={() => switchType("facility")}
                className={`rounded-full px-4 py-2 text-[0.82rem] font-medium transition ${
                  userType === "facility"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Facility
              </button>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-3xl border border-border bg-card/80 p-5 shadow-[0_24px_80px_rgba(35,35,25,0.06)] md:p-6"
            >
              <input type="hidden" value={userType} {...form.register("userType")} />
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  {userType === "professional" ? "Professional Account" : "Facility Account"}
                </p>
                <h2 className="mt-3 text-[1.85rem] leading-tight tracking-[-0.045em]">
                  {userType === "professional"
                    ? "Tell us how you work."
                    : "Tell us about your facility."}
                </h2>
                <p className="mt-2 text-[0.9rem] leading-6 text-muted-foreground">
                  {userType === "professional"
                    ? "Capture the essentials needed to browse and claim open shifts."
                    : "Capture the essentials needed to post and coordinate coverage."}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {userType === "professional" ? (
                  <>
                    <Field
                      label="Full Name"
                      id="fullName"
                      error={"fullName" in errors ? errors.fullName?.message : undefined}
                    >
                      <Input
                        id="fullName"
                        placeholder="Amiel Salipande"
                        {...form.register("fullName")}
                      />
                    </Field>
                    <Field label="Email" id="email" error={errors.email?.message}>
                      <Input
                        id="email"
                        placeholder="name@email.com"
                        {...form.register("email")}
                      />
                    </Field>
                    <Field
                      label="Primary Role"
                      id="role"
                      error={"role" in errors ? errors.role?.message : undefined}
                    >
                      <Input
                        id="role"
                        placeholder="RN, LPN, CNA..."
                        {...form.register("role")}
                      />
                    </Field>
                    <Field
                      label="License State"
                      id="licenseState"
                      error={"licenseState" in errors ? errors.licenseState?.message : undefined}
                    >
                      <Input
                        id="licenseState"
                        placeholder="CA, NY, TX..."
                        {...form.register("licenseState")}
                      />
                    </Field>
                  </>
                ) : (
                  <>
                    <Field
                      label="Facility Name"
                      id="facilityName"
                      error={"facilityName" in errors ? errors.facilityName?.message : undefined}
                    >
                      <Input
                        id="facilityName"
                        placeholder="North Harbor Medical"
                        {...form.register("facilityName")}
                      />
                    </Field>
                    <Field label="Work Email" id="email" error={errors.email?.message}>
                      <Input
                        id="email"
                        placeholder="ops@facility.com"
                        {...form.register("email")}
                      />
                    </Field>
                    <Field
                      label="Primary Contact"
                      id="contactName"
                      error={"contactName" in errors ? errors.contactName?.message : undefined}
                    >
                      <Input
                        id="contactName"
                        placeholder="Lena Carter"
                        {...form.register("contactName")}
                      />
                    </Field>
                    <Field
                      label="City"
                      id="city"
                      error={"city" in errors ? errors.city?.message : undefined}
                    >
                      <Input
                        id="city"
                        placeholder="San Francisco"
                        {...form.register("city")}
                      />
                    </Field>
                  </>
                )}
              </div>

              <Button
                type="submit"
                className="mt-6 h-11 w-full rounded-full text-[0.88rem] font-medium"
              >
                Create Account
              </Button>
            </form>

            {submitted && (
              <section className="mt-4 rounded-2xl border border-primary/15 bg-primary/10 p-4 text-[0.84rem]">
                <p className="font-semibold text-primary">Mock submission completed.</p>
                <p className="mt-1 leading-6 text-muted-foreground">
                  Account type: {submitted.userType}. Your data has been captured locally for demo
                  purposes.
                </p>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-[0.78rem] text-red-600">{error}</p> : null}
    </div>
  );
}
