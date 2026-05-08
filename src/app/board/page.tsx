"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { claimShift, fetchShifts } from "@/lib/mock-api";
import type { Shift } from "@/lib/types";

export default function BoardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [roleFilter, setRoleFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [lastClaimedId, setLastClaimedId] = useState<string | null>(null);
  const [claimingShiftId, setClaimingShiftId] = useState<string | null>(null);
  const [claimMessage, setClaimMessage] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }
    if (!loading && user?.type !== "professional") {
      router.replace("/dashboard/facility");
    }
  }, [loading, router, user]);

  const { data: shifts = [], isLoading } = useQuery({
    queryKey: ["shifts"],
    queryFn: fetchShifts,
  });

  const roles = useMemo(() => ["all", ...new Set(shifts.map((shift) => shift.role))], [shifts]);

  const filteredShifts = useMemo(
    () =>
      shifts.filter((shift) => {
        const roleOk = roleFilter === "all" ? true : shift.role === roleFilter;
        const dateOk = dateFilter ? shift.date === dateFilter : true;
        return roleOk && dateOk;
      }),
    [dateFilter, roleFilter, shifts],
  );

  const claimMutation = useMutation({
    mutationFn: async (shiftId: string) => claimShift(shiftId, user!),
    onSuccess: (next) => {
      queryClient.setQueryData(["shifts"], next);
    },
  });

  if (loading || !user || user.type !== "professional") {
    return null;
  }

  const onClaim = async (shiftId: string) => {
    try {
      setClaimError(null);
      setClaimMessage(null);
      setClaimingShiftId(shiftId);
      await claimMutation.mutateAsync(shiftId);
      setLastClaimedId(shiftId);
      const claimedShift = shifts.find((shift) => shift.id === shiftId);
      setClaimMessage(
        claimedShift
          ? `Shift claimed successfully. ${claimedShift.facilityName} has been added to your claimed shifts.`
          : "Shift claimed successfully."
      );
    } catch {
      setClaimError("Unable to claim this shift right now. Please try again.");
    } finally {
      setClaimingShiftId(null);
    }
  };

  const resetDemoData = () => {
    localStorage.removeItem("shiftlink.shifts");
    setLastClaimedId(null);
    setClaimMessage("Demo shift data has been reset.");
    setClaimError(null);
    queryClient.invalidateQueries({ queryKey: ["shifts"] });
  };

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

      <section className="mb-8 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Professional Workspace</p>
          <h1 className="mt-4 max-w-2xl text-[2.75rem] leading-[0.98] tracking-[-0.055em] md:text-[4rem]">
            Browse open shifts and claim the right fit.
          </h1>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-muted-foreground md:text-[1.02rem]">
            Signed in as {user.name}. Filter by role or date, review the shift details, then claim an available shift with one click.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Open</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em]">{shifts.filter((shift) => !shift.claimedBy).length}</p>
            <p className="mt-1 text-[0.76rem] text-muted-foreground">Available shifts</p>
          </article>
          <article className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Roles</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em]">{Math.max(roles.length - 1, 0)}</p>
            <p className="mt-1 text-[0.76rem] text-muted-foreground">Currently posted</p>
          </article>
          <article className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Showing</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em]">{filteredShifts.length}</p>
            <p className="mt-1 text-[0.76rem] text-muted-foreground">Matched results</p>
          </article>
        </div>
      </section>

      <section className="mb-6 rounded-3xl border border-border bg-card/75 p-4 shadow-[0_18px_60px_rgba(35,35,25,0.04)] md:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Filters</p>
            <h2 className="mt-1 text-[1.35rem] leading-tight tracking-[-0.04em]">Narrow the board</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={resetDemoData}
              className="h-9 rounded-full px-4 text-[0.82rem] font-medium"
            >
              Reset Demo Data
            </Button>
            {(roleFilter !== "all" || dateFilter) && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRoleFilter("all");
                  setDateFilter("");
                }}
                className="h-9 rounded-full px-4 text-[0.82rem] font-medium"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:items-end lg:grid-cols-[1fr_1fr_auto]">
          <label className="min-w-0 space-y-2">
            <Label className="text-[0.82rem] font-medium text-foreground/85">Role</Label>
            <div className="relative">
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-11 appearance-none rounded-xl border-input bg-background/70 px-3 pr-10 text-[0.92rem] focus:border-primary focus:ring-4 focus:ring-primary/10"
              >
                {roles.map((role) => (
                  <option value={role} key={role}>
                    {role === "all" ? "All roles" : role}
                  </option>
                ))}
              </Select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            </div>
          </label>
          <label className="min-w-0 space-y-2">
            <Label className="text-[0.82rem] font-medium text-foreground/85">Date</Label>
            <Input
              type="date"
              className="h-11 rounded-xl border-input bg-background/70 px-3 text-[0.92rem] focus:border-primary focus:ring-4 focus:ring-primary/10"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDateFilter("")}
            className="h-11 rounded-full px-5 text-[0.82rem] font-medium md:col-span-2 md:w-fit lg:col-span-1"
          >
            Clear Date
          </Button>
        </div>
      </section>

      {claimMessage ? (
        <section className="mb-4 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-[0.86rem] text-primary">
          {claimMessage}
        </section>
      ) : null}
      {claimError ? (
        <section className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[0.86rem] text-red-700">
          {claimError}
        </section>
      ) : null}

      {isLoading ? <p className="text-[0.92rem] text-muted-foreground">Loading shifts...</p> : null}

      <section className="grid gap-4 pb-10 md:grid-cols-2">
        {!isLoading && filteredShifts.length === 0 ? (
          <article className="rounded-3xl border border-border bg-card/80 p-6 md:col-span-2">
            <p className="text-[1.2rem] font-semibold tracking-[-0.02em]">No shifts match your filters.</p>
            <p className="mt-2 max-w-xl text-[0.9rem] text-muted-foreground">
              Try clearing role or date filters to see more open shifts.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setRoleFilter("all");
                setDateFilter("");
              }}
              className="mt-4 h-10 rounded-full px-4 text-[0.82rem] font-medium"
            >
              Clear Filters
            </Button>
          </article>
        ) : null}
        {filteredShifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            busy={claimingShiftId === shift.id}
            claimedByCurrentUser={shift.claimedBy === user.email}
            justClaimed={lastClaimedId === shift.id}
            onClaim={() => onClaim(shift.id)}
          />
        ))}
      </section>
    </main>
  );
}

function ShiftCard({
  shift,
  busy,
  claimedByCurrentUser,
  justClaimed,
  onClaim,
}: {
  shift: Shift;
  busy: boolean;
  claimedByCurrentUser: boolean;
  justClaimed: boolean;
  onClaim: () => void;
}) {
  const alreadyClaimed = Boolean(shift.claimedBy);
  return (
    <article className="group rounded-3xl border border-border bg-card/80 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(35,35,25,0.07)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{shift.role}</p>
          <h2 className="mt-2 text-[1.65rem] leading-tight tracking-[-0.045em] md:text-[1.9rem]">{shift.facilityName}</h2>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[0.7rem] font-medium ${
            alreadyClaimed
              ? claimedByCurrentUser
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {alreadyClaimed ? (claimedByCurrentUser ? "Claimed" : "Taken") : "Available"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
        <div>
          <p className="text-[0.72rem] text-muted-foreground">Date</p>
          <p className="mt-1 text-[0.9rem] font-medium">{shift.date}</p>
        </div>
        <div>
          <p className="text-[0.72rem] text-muted-foreground">Time</p>
          <p className="mt-1 text-[0.9rem] font-medium">
            {shift.startTime} - {shift.endTime}
          </p>
        </div>
        <div>
          <p className="text-[0.72rem] text-muted-foreground">Rate</p>
          <p className="mt-1 text-[0.9rem] font-semibold">${shift.rate}/hr</p>
        </div>
      </div>

      <div className="mt-5">
        {alreadyClaimed ? (
          <p className="rounded-2xl bg-secondary px-4 py-3 text-[0.86rem] font-medium text-muted-foreground">
            {claimedByCurrentUser ? "You claimed this shift." : "This shift has already been claimed."}
          </p>
        ) : (
          <Button
            type="button"
            onClick={onClaim}
            disabled={busy}
            className="h-10 w-full rounded-full px-4 text-[0.84rem] font-medium disabled:opacity-70 sm:w-auto sm:min-w-36"
          >
            {busy ? "Claiming..." : "Claim Shift"}
          </Button>
        )}
        {justClaimed ? <p className="mt-3 text-[0.84rem] font-medium text-primary">Shift claimed successfully.</p> : null}
      </div>
    </article>
  );
}
