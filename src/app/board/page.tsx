"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
    await claimMutation.mutateAsync(shiftId);
    setLastClaimedId(shiftId);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl leading-tight">Open Shift Board</h1>
          <p className="mt-1 text-muted-foreground">Signed in as {user.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
            Home
          </Link>
          <Button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="rounded-full px-4 py-2 text-sm"
          >
            Log Out
          </Button>
        </div>
      </header>

      <section className="mb-6 grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
        <label className="space-y-2">
          <Label className="text-sm font-medium">Filter by role</Label>
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {roles.map((role) => (
              <option value={role} key={role}>
                {role === "all" ? "All roles" : role}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-2">
          <Label className="text-sm font-medium">Filter by date</Label>
          <Input type="date" className="rounded-lg bg-background px-3 py-2" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </label>
        <div className="flex items-end">
          <Button type="button" variant="outline" onClick={() => setDateFilter("")} className="rounded-full px-4 py-2 text-sm">
            Clear Date
          </Button>
        </div>
      </section>

      {isLoading ? <p>Loading shifts...</p> : null}

      <section className="grid gap-4 md:grid-cols-2">
        {filteredShifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            busy={claimMutation.isPending}
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
    <article className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{shift.role}</p>
      <h2 className="mt-2 text-2xl">{shift.facilityName}</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">Date</dt>
          <dd>{shift.date}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">Time</dt>
          <dd>
            {shift.startTime} - {shift.endTime}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">Rate</dt>
          <dd>${shift.rate}/hr</dd>
        </div>
      </dl>

      <div className="mt-6">
        {alreadyClaimed ? (
          <p className="rounded-lg bg-secondary px-3 py-2 text-sm font-medium">{claimedByCurrentUser ? "Claimed by you" : "Already claimed"}</p>
        ) : (
          <Button type="button" onClick={onClaim} disabled={busy} className="h-10 w-full rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-70">
            {busy ? "Claiming..." : "Claim Shift"}
          </Button>
        )}
        {justClaimed ? <p className="mt-2 text-sm text-accent-foreground">Shift claimed successfully.</p> : null}
      </div>
    </article>
  );
}
