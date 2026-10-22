export const VISITS_PER_REWARD = 5;

export type Gender = "women" | "men";

export type Visit = {
  id: string;
  date: string; // YYYY-MM-DD
  service?: string;
  amountKes?: number;
  loggedAt: string; // ISO timestamp
};

export type Client = {
  id: string;
  name: string;
  phone: string; // normalized 254XXXXXXXXX
  gender: Gender;
  createdAt: string;
  visits: Visit[];
  rewardsClaimed: number;
  reviewVerified: boolean; // for the current reward cycle
  reviewVerifiedAt?: string;
  reviewHasPhoto?: boolean;
};

export const rewardFor = (gender: Gender) =>
  gender === "men" ? "Free facial scrub" : "Free nail art";

export type Progress = {
  cycleVisits: number; // paid visits in the current cycle, capped at 5
  remaining: number;
  status: "building" | "needs-review" | "ready";
};

export function progressOf(c: Client): Progress {
  const raw = Math.max(0, c.visits.length - c.rewardsClaimed * VISITS_PER_REWARD);
  const cycleVisits = Math.min(raw, VISITS_PER_REWARD);
  const remaining = VISITS_PER_REWARD - cycleVisits;
  const status =
    cycleVisits < VISITS_PER_REWARD ? "building" : c.reviewVerified ? "ready" : "needs-review";
  return { cycleVisits, remaining, status };
}
