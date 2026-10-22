"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, passwordMatches, requireAdmin, startSession } from "@/lib/auth";
import { mutate } from "@/lib/store";
import { normalizePhone } from "@/lib/phone";
import { VISITS_PER_REWARD, progressOf, type Client, type Gender } from "@/lib/loyalty";

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });

export async function login(_prev: { error?: string } | null, fd: FormData) {
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "The admin password has not been set up for this site yet." };
  }
  if (!passwordMatches(str(fd, "password"))) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: "That password is not right. Check it and try again." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function addClient(fd: FormData) {
  await requireAdmin();
  const name = str(fd, "name");
  const phone = normalizePhone(str(fd, "phone"));
  const gender: Gender = str(fd, "gender") === "men" ? "men" : "women";

  if (!name) redirect("/admin?error=name");
  if (!phone) redirect("/admin?error=phone");

  const existing = await mutate((data) => {
    const found = data.clients.find((c) => c.phone === phone);
    if (found) return found.id;
    const client: Client = {
      id: randomUUID(),
      name,
      phone,
      gender,
      createdAt: new Date().toISOString(),
      visits: [],
      rewardsClaimed: 0,
      reviewVerified: false,
    };
    data.clients.unshift(client);
    return null;
  });

  revalidatePath("/admin");
  if (existing) redirect(`/admin?q=${phone}&error=exists`);
  redirect(`/admin?q=${phone}&notice=added`);
}

export async function logVisit(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "clientId");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(str(fd, "date")) ? str(fd, "date") : today();
  const service = str(fd, "service").slice(0, 80) || undefined;
  const amount = Number(str(fd, "amount").replace(/,/g, ""));

  await mutate((data) => {
    const c = data.clients.find((x) => x.id === id);
    if (!c) return;
    c.visits.push({
      id: randomUUID(),
      date,
      service,
      amountKes: Number.isFinite(amount) && amount > 0 ? Math.round(amount) : undefined,
      loggedAt: new Date().toISOString(),
    });
  });
  revalidatePath("/admin");
}

export async function removeVisit(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "clientId");
  const visitId = str(fd, "visitId");
  await mutate((data) => {
    const c = data.clients.find((x) => x.id === id);
    if (!c) return;
    // Visits already used for a claimed reward stay on record.
    if (c.visits.length - 1 < c.rewardsClaimed * VISITS_PER_REWARD) return;
    c.visits = c.visits.filter((v) => v.id !== visitId);
  });
  revalidatePath("/admin");
}

export async function verifyReview(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "clientId");
  const withPhoto = fd.get("photo") === "on";
  await mutate((data) => {
    const c = data.clients.find((x) => x.id === id);
    if (!c) return;
    c.reviewVerified = true;
    c.reviewHasPhoto = withPhoto;
    c.reviewVerifiedAt = new Date().toISOString();
  });
  revalidatePath("/admin");
}

export async function unverifyReview(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "clientId");
  await mutate((data) => {
    const c = data.clients.find((x) => x.id === id);
    if (!c) return;
    c.reviewVerified = false;
    c.reviewHasPhoto = undefined;
    c.reviewVerifiedAt = undefined;
  });
  revalidatePath("/admin");
}

export async function claimReward(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "clientId");
  await mutate((data) => {
    const c = data.clients.find((x) => x.id === id);
    if (!c || progressOf(c).status !== "ready") return;
    c.rewardsClaimed += 1;
    // The next cycle needs a fresh verified review.
    c.reviewVerified = false;
    c.reviewHasPhoto = undefined;
    c.reviewVerifiedAt = undefined;
  });
  revalidatePath("/admin");
}
