"use client";

import type { SessionUser, Shift } from "@/lib/types";

const SHIFT_STORAGE_KEY = "shiftlink.shifts";

const seedShifts: Shift[] = [
  { id: "s1", role: "RN", facilityName: "North Harbor Medical", date: "2026-05-10", startTime: "07:00", endTime: "15:00", rate: 62, claimedBy: null },
  { id: "s2", role: "LPN", facilityName: "Mapleview Senior Care", date: "2026-05-10", startTime: "15:00", endTime: "23:00", rate: 48, claimedBy: null },
  { id: "s3", role: "CNA", facilityName: "Riverside Recovery", date: "2026-05-11", startTime: "07:00", endTime: "19:00", rate: 36, claimedBy: null },
  { id: "s4", role: "RN", facilityName: "St. Aurora Community", date: "2026-05-11", startTime: "19:00", endTime: "07:00", rate: 68, claimedBy: null },
  { id: "s5", role: "RT", facilityName: "Lakepoint Health", date: "2026-05-12", startTime: "08:00", endTime: "16:00", rate: 59, claimedBy: null },
  { id: "s6", role: "RN", facilityName: "Cedarline Hospital", date: "2026-05-12", startTime: "16:00", endTime: "00:00", rate: 65, claimedBy: null },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ensureShifts(): Shift[] {
  if (typeof window === "undefined") {
    return seedShifts;
  }
  const raw = localStorage.getItem(SHIFT_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(SHIFT_STORAGE_KEY, JSON.stringify(seedShifts));
    return seedShifts;
  }
  return JSON.parse(raw) as Shift[];
}

function saveShifts(shifts: Shift[]) {
  localStorage.setItem(SHIFT_STORAGE_KEY, JSON.stringify(shifts));
}

export async function fetchShifts() {
  await wait(220);
  return ensureShifts();
}

export async function claimShift(shiftId: string, user: SessionUser) {
  await wait(200);
  const shifts = ensureShifts();
  const updated = shifts.map((shift) =>
    shift.id === shiftId && !shift.claimedBy ? { ...shift, claimedBy: user.email } : shift,
  );
  saveShifts(updated);
  return updated;
}
