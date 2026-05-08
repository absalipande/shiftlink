"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    defaultValues: { userType: "professional", fullName: "", email: "", role: "", licenseState: "" },
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
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
        Back to ShiftLink
      </Link>
      <h1 className="mt-6 text-4xl leading-tight">Create your ShiftLink account</h1>
      <p className="mt-2 text-muted-foreground">Select your role to continue.</p>

      <div className="mt-8 inline-flex rounded-full border border-border p-1">
        <button type="button" onClick={() => switchType("professional")} className={`rounded-full px-4 py-2 text-sm ${userType === "professional" ? "bg-primary text-primary-foreground" : ""}`}>
          Professional
        </button>
        <button type="button" onClick={() => switchType("facility")} className={`rounded-full px-4 py-2 text-sm ${userType === "facility" ? "bg-primary text-primary-foreground" : ""}`}>
          Facility
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5 rounded-xl border border-border bg-card p-6">
        <input type="hidden" value={userType} {...form.register("userType")} />
        {userType === "professional" ? (
          <>
            <Field label="Full Name" id="fullName" error={"fullName" in errors ? errors.fullName?.message : undefined}>
              <input id="fullName" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("fullName")} />
            </Field>
            <Field label="Email" id="email" error={errors.email?.message}>
              <input id="email" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("email")} />
            </Field>
            <Field label="Primary Role" id="role" error={"role" in errors ? errors.role?.message : undefined}>
              <input id="role" className="w-full rounded-lg border border-input bg-background px-3 py-2" placeholder="RN, LPN, CNA..." {...form.register("role")} />
            </Field>
            <Field label="License State" id="licenseState" error={"licenseState" in errors ? errors.licenseState?.message : undefined}>
              <input id="licenseState" className="w-full rounded-lg border border-input bg-background px-3 py-2" placeholder="CA, NY, TX..." {...form.register("licenseState")} />
            </Field>
          </>
        ) : (
          <>
            <Field label="Facility Name" id="facilityName" error={"facilityName" in errors ? errors.facilityName?.message : undefined}>
              <input id="facilityName" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("facilityName")} />
            </Field>
            <Field label="Work Email" id="email" error={errors.email?.message}>
              <input id="email" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("email")} />
            </Field>
            <Field label="Primary Contact" id="contactName" error={"contactName" in errors ? errors.contactName?.message : undefined}>
              <input id="contactName" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("contactName")} />
            </Field>
            <Field label="City" id="city" error={"city" in errors ? errors.city?.message : undefined}>
              <input id="city" className="w-full rounded-lg border border-input bg-background px-3 py-2" {...form.register("city")} />
            </Field>
          </>
        )}
        <button type="submit" className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
          Create Account
        </button>
      </form>

      {submitted && (
        <section className="mt-6 rounded-xl border border-accent bg-accent/20 p-4 text-sm">
          <p className="font-semibold">Mock submission completed.</p>
          <p className="mt-1 text-muted-foreground">Account type: {submitted.userType}. Your data has been captured locally for demo purposes.</p>
        </section>
      )}
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
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
