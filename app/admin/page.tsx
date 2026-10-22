import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { readClients } from "@/lib/store";
import { formatPhone, phoneMatches } from "@/lib/phone";
import { progressOf, rewardFor, VISITS_PER_REWARD, type Client } from "@/lib/loyalty";
import Stamps from "@/components/Stamps";
import {
  addClient,
  claimReward,
  logVisit,
  logout,
  removeVisit,
  unverifyReview,
  verifyReview,
} from "./actions";

export const metadata: Metadata = {
  title: "Loyalty desk",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const messages: Record<string, { tone: "error" | "ok"; text: string }> = {
  name: { tone: "error", text: "Enter the client's name." },
  phone: { tone: "error", text: "That phone number doesn't look right. Use a Kenyan number like 0712 345 678." },
  exists: { tone: "error", text: "A client with that number already exists. They are shown below." },
  added: { tone: "ok", text: "Client added. Log their first visit below." },
};

const order = { ready: 0, "needs-review": 1, building: 2 } as const;
const todayNairobi = () => new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });

function statusText(c: Client) {
  const p = progressOf(c);
  if (p.status === "ready") return { tone: "ready", text: `Ready to claim: ${rewardFor(c.gender)}` };
  if (p.status === "needs-review")
    return { tone: "review", text: "5 visits done. Verify their Google review to unlock the reward." };
  return {
    tone: "building",
    text: `${p.remaining} more paid visit${p.remaining === 1 ? "" : "s"} to the reward`,
  };
}

function ClientCard({ c }: { c: Client }) {
  const p = progressOf(c);
  const st = statusText(c);
  const recent = [...c.visits].reverse().slice(0, 6);
  const canRemove = c.visits.length - 1 >= c.rewardsClaimed * VISITS_PER_REWARD;

  return (
    <li className="adm-client">
      <div className="adm-client__top">
        <div>
          <h3 className="adm-client__name">{c.name}</h3>
          <p className="adm-muted">
            {formatPhone(c.phone)} · {c.gender === "men" ? "Men" : "Women"} · {c.visits.length} visit
            {c.visits.length === 1 ? "" : "s"} in total
            {c.rewardsClaimed ? ` · ${c.rewardsClaimed} reward${c.rewardsClaimed === 1 ? "" : "s"} claimed` : ""}
          </p>
        </div>
        <Stamps filled={p.cycleVisits} label={`${p.cycleVisits} of 5 paid visits this cycle`} />
      </div>

      <p className={`adm-status adm-status--${st.tone}`}>{st.text}</p>

      <div className="adm-actions">
        <form action={logVisit} className="adm-visit">
          <input type="hidden" name="clientId" value={c.id} />
          <label className="adm-field adm-field--sm">
            <span>Date</span>
            <input type="date" name="date" defaultValue={todayNairobi()} required />
          </label>
          <label className="adm-field adm-field--sm adm-grow">
            <span>Service (optional)</span>
            <input type="text" name="service" maxLength={80} placeholder="e.g. Gel polish" />
          </label>
          <label className="adm-field adm-field--sm adm-amount">
            <span>Paid, KES</span>
            <input type="text" name="amount" inputMode="numeric" placeholder="1,200" />
          </label>
          <button type="submit" className="btn btn--rose btn--sm">
            Log paid visit
          </button>
        </form>

        <div className="adm-review">
          {c.reviewVerified ? (
            <form action={unverifyReview} className="adm-inline">
              <input type="hidden" name="clientId" value={c.id} />
              <span className="adm-badge adm-badge--ok">
                Google review verified{c.reviewHasPhoto ? " · with photo" : ""}
              </span>
              <button type="submit" className="adm-link">
                Undo
              </button>
            </form>
          ) : (
            <form action={verifyReview} className="adm-inline">
              <input type="hidden" name="clientId" value={c.id} />
              <label className="adm-check">
                <input type="checkbox" name="photo" /> Includes salon photo
              </label>
              <button type="submit" className="btn btn--soft btn--sm">
                Verify Google review
              </button>
            </form>
          )}

          {p.status === "ready" ? (
            <form action={claimReward}>
              <input type="hidden" name="clientId" value={c.id} />
              <button type="submit" className="btn btn--rose btn--sm">
                Claim {rewardFor(c.gender).toLowerCase()}
              </button>
            </form>
          ) : null}
        </div>
      </div>

      {recent.length ? (
        <details className="adm-history">
          <summary>Recent visits</summary>
          <ul>
            {recent.map((v) => (
              <li key={v.id}>
                <span>
                  {v.date}
                  {v.service ? ` · ${v.service}` : ""}
                  {v.amountKes ? ` · KES ${v.amountKes.toLocaleString("en-KE")}` : ""}
                </span>
                {canRemove ? (
                  <form action={removeVisit}>
                    <input type="hidden" name="clientId" value={c.id} />
                    <input type="hidden" name="visitId" value={v.id} />
                    <button type="submit" className="adm-link adm-link--danger">
                      Remove
                    </button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </li>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; error?: string; notice?: string }>;
}) {
  await requireAdmin();
  const { q = "", error, notice } = await searchParams;

  let clients: Client[] = [];
  let storageError: string | null = null;
  try {
    clients = await readClients();
  } catch (e) {
    storageError = e instanceof Error ? e.message : "Could not load client data.";
  }

  const query = q.trim().toLowerCase();
  const shown = (
    query
      ? clients.filter((c) => c.name.toLowerCase().includes(query) || phoneMatches(c.phone, query))
      : clients
  ).sort((a, b) => order[progressOf(a).status] - order[progressOf(b).status]);

  const ready = clients.filter((c) => progressOf(c).status === "ready").length;
  const needsReview = clients.filter((c) => progressOf(c).status === "needs-review").length;
  const banner = messages[error ?? notice ?? ""];

  return (
    <main className="adm">
      <header className="adm-head">
        <div>
          <p className="adm-eyebrow">Calm Beauty Hub</p>
          <h1 className="adm-title">Loyalty desk</h1>
        </div>
        <div className="adm-head__links">
          <a href="/" className="adm-link">
            View site
          </a>
          <form action={logout}>
            <button type="submit" className="btn btn--soft btn--sm">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {storageError ? (
        <p role="alert" className="adm-alert adm-alert--error">
          {storageError}
        </p>
      ) : null}
      {banner ? (
        <p role={banner.tone === "error" ? "alert" : "status"} className={`adm-alert adm-alert--${banner.tone}`}>
          {banner.text}
        </p>
      ) : null}

      <section className="adm-stats" aria-label="Summary">
        <div>
          <strong>{clients.length}</strong>
          <span>Clients</span>
        </div>
        <div>
          <strong>{ready}</strong>
          <span>Ready to claim</span>
        </div>
        <div>
          <strong>{needsReview}</strong>
          <span>Waiting on a review</span>
        </div>
      </section>

      <form className="adm-search" role="search" action="/admin">
        <label className="adm-field adm-grow">
          <span>Search by name or phone</span>
          <input type="search" name="q" defaultValue={q} placeholder="Wanjiru or 0712…" />
        </label>
        <button type="submit" className="btn btn--rose">
          Search
        </button>
        {q ? (
          <a href="/admin" className="btn btn--soft">
            Clear
          </a>
        ) : null}
      </form>

      <details className="adm-add" open={clients.length === 0 || error === "name" || error === "phone"}>
        <summary>Add a new client</summary>
        <form action={addClient} className="adm-add__form">
          <label className="adm-field">
            <span>Name</span>
            <input type="text" name="name" required maxLength={80} autoComplete="off" />
          </label>
          <label className="adm-field">
            <span>Phone</span>
            <input type="tel" name="phone" required placeholder="0712 345 678" autoComplete="off" />
          </label>
          <fieldset className="adm-field">
            <legend>Services for</legend>
            <label className="adm-check">
              <input type="radio" name="gender" value="women" defaultChecked /> Women
            </label>
            <label className="adm-check">
              <input type="radio" name="gender" value="men" /> Men
            </label>
          </fieldset>
          <button type="submit" className="btn btn--rose">
            Add client
          </button>
        </form>
      </details>

      {shown.length ? (
        <ul className="adm-list">
          {shown.slice(0, 60).map((c) => (
            <ClientCard key={c.id} c={c} />
          ))}
        </ul>
      ) : (
        <p className="adm-empty">
          {clients.length
            ? `No client matches "${q}". Check the spelling or add them above.`
            : "No clients yet. Add your first client above to start tracking visits."}
        </p>
      )}
      {shown.length > 60 ? <p className="adm-muted">Showing the first 60. Search to narrow the list.</p> : null}
    </main>
  );
}
