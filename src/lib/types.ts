export type UserType = "professional" | "facility";

export type SessionUser = {
  email: string;
  name: string;
  type: UserType;
};

export type Shift = {
  id: string;
  role: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  rate: number;
  claimedBy: string | null;
};
