"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const professionalPoints = ["Transparent rates", "Flexible claiming", "Claim confirmation"];
const facilityPoints = ["Post urgent shifts", "Reach available clinicians", "Track coverage"];

const previewShifts = [
  {
    role: "Registered Nurse",
    facility: "Cedar Valley Clinic",
    date: "May 12",
    time: "7:00 AM - 3:00 PM",
    rate: "PHP 750/hr",
  },
  {
    role: "Care Assistant",
    facility: "Northline Care Home",
    date: "May 14",
    time: "2:00 PM - 10:00 PM",
    rate: "PHP 520/hr",
  },
  {
    role: "LPN",
    facility: "Harborview Medical",
    date: "May 15",
    time: "3:00 PM - 11:00 PM",
    rate: "PHP 640/hr",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-5 md:px-8 md:py-7">
      <header className="mb-9 flex items-center justify-between">
        <p className="text-lg font-semibold tracking-[-0.03em] md:text-[1.55rem]">ShiftLink</p>
        <div className="flex items-center gap-2 text-[0.82rem] md:gap-3">
          <Link href="/login" className="rounded-full border border-border px-4 py-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
            Log In
          </Link>
          <Link href="/signup" className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90">
            Sign Up
          </Link>
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="space-y-4 md:space-y-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Healthcare Staffing Marketplace</p>
          <h1 className="max-w-2xl text-[2.7rem] leading-[0.98] tracking-[-0.055em] md:text-[4.05rem]">
            Fill open shifts faster while giving clinicians more <span className="text-primary">control</span>.
          </h1>
          <p className="max-w-xl text-[0.98rem] leading-7 text-muted-foreground md:text-[1.02rem]">
            ShiftLink connects facilities needing dependable coverage with qualified professionals ready for flexible, high-value shifts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup?type=professional" className="rounded-full bg-primary px-5 py-2.5 text-[0.84rem] font-medium text-primary-foreground transition hover:opacity-90">
              Join as Professional
            </Link>
            <Link href="/signup?type=facility" className="rounded-full border border-border px-5 py-2.5 text-[0.84rem] font-medium text-foreground transition hover:bg-secondary">
              Post a Shift
            </Link>
          </div>
        </div>

        <div className="space-y-3 md:pt-6">
          <article className="rounded-2xl border border-border bg-card/80 p-4 shadow-[0_18px_60px_rgba(35,35,25,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Open Shift</p>
                <h3 className="mt-2 text-[1.35rem] leading-tight tracking-[-0.035em]">RN · North Harbor Medical</h3>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-medium text-primary">Available</span>
            </div>
            <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
              <div>
                <p className="text-[0.78rem] text-muted-foreground">May 12 · 7:00 AM - 3:00 PM</p>
                <p className="mt-1 text-[0.95rem] font-semibold">PHP 750/hr</p>
              </div>
              <Link href="/shift-board" className="rounded-full bg-primary px-4 py-2 text-[0.78rem] font-medium text-primary-foreground">
                Claim Shift
              </Link>
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card/70 p-4">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Trust Signals</p>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <dt className="text-[0.7rem] text-muted-foreground">Professionals</dt>
                  <dd className="text-[1.15rem] font-semibold tracking-[-0.03em]">3,400+</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] text-muted-foreground">Facilities</dt>
                  <dd className="text-[1.15rem] font-semibold tracking-[-0.03em]">260+</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] text-muted-foreground">Shifts/Month</dt>
                  <dd className="text-[1.15rem] font-semibold tracking-[-0.03em]">11,900+</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] text-muted-foreground">Avg. Fill</dt>
                  <dd className="text-[1.15rem] font-semibold tracking-[-0.03em]">47 min</dd>
                </div>
              </dl>
            </article>
            <article className="rounded-2xl border border-border bg-card/70 p-4">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Live Status</p>
              <p className="mt-3 text-[0.78rem] text-muted-foreground">Shift #NHM-1298</p>
              <p className="mt-1 text-[1.05rem] font-semibold tracking-[-0.025em] text-primary">Claimed successfully</p>
              <p className="mt-2 text-[0.75rem] leading-5 text-muted-foreground">Assigned to RN · 11 mins ago</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-7 rounded-2xl border border-border bg-card/55 px-4 py-3 md:px-5">
        <div className="grid gap-3 text-[0.82rem] text-muted-foreground md:grid-cols-4">
          <p><span className="text-[1rem] font-semibold tracking-[-0.02em] text-foreground">3,400+</span> Active Professionals</p>
          <p><span className="text-[1rem] font-semibold tracking-[-0.02em] text-foreground">260+</span> Partner Facilities</p>
          <p><span className="text-[1rem] font-semibold tracking-[-0.02em] text-foreground">11,900+</span> Shifts Filled / Month</p>
          <p><span className="text-[1rem] font-semibold tracking-[-0.02em] text-foreground">47 min</span> Average Fill Time</p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <UserPathCard
          id="professionals"
          label="For Professionals"
          title="Choose shifts that match your life."
          description="Browse transparent rates, filter by role or date, and claim available shifts without waiting for manual coordination."
          bullets={professionalPoints}
          ctaHref="/signup?type=professional"
          ctaLabel="Join as Professional"
          primary
        />
        <UserPathCard
          id="facilities"
          label="For Facilities"
          title="Fill urgent coverage gaps without the back-and-forth."
          description="Post open shifts, reach available clinicians, and reduce time spent manually coordinating coverage."
          bullets={facilityPoints}
          ctaHref="/signup?type=facility"
          ctaLabel="Join as Facility"
        />
      </section>

      <section id="shift-board" className="mt-10 px-0 pb-8">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Shift Board Preview</p>
        <h2 className="mt-2 max-w-2xl text-[1.85rem] leading-tight tracking-[-0.045em] md:text-[2.2rem]">Available shifts, clearly presented.</h2>
        <p className="mt-2 max-w-3xl text-[0.95rem] leading-7 text-muted-foreground">
          Professionals can browse open shifts by role, date, time, facility, and rate before claiming.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {previewShifts.map((shift) => (
            <article key={`${shift.role}-${shift.facility}`} className="rounded-2xl border border-border bg-card/85 p-4">
              <p className="text-[0.92rem] font-semibold tracking-[-0.01em]">{shift.role}</p>
              <p className="mt-1 text-[0.82rem] text-muted-foreground">{shift.facility}</p>
              <p className="mt-4 text-[0.82rem] text-muted-foreground">{shift.date} · {shift.time}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[0.9rem] font-semibold">{shift.rate}</p>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-medium text-primary">Available</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function UserPathCard({
  id,
  label,
  title,
  description,
  bullets,
  ctaHref,
  ctaLabel,
  primary,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  ctaHref: string;
  ctaLabel: string;
  primary?: boolean;
}) {
  return (
    <article id={id} className="flex h-full min-h-[255px] flex-col rounded-2xl border border-border bg-card/75 p-5 md:p-6">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</p>
      <h3 className="mt-2 max-w-[26rem] text-[1.75rem] leading-[1.03] tracking-[-0.05em] md:text-[2.05rem]">{title}</h3>
      <p className="mt-3 max-w-[30rem] text-[0.92rem] leading-6 text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-2">
        {bullets.map((point) => (
          <li key={point} className="flex items-center gap-2 text-[0.84rem] text-foreground/85">
            <CheckCircle2 size={15} className="shrink-0 text-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`mt-5 inline-block w-fit rounded-full px-5 py-2.5 text-[0.84rem] font-medium transition ${
          primary ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-secondary"
        }`}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
