// Kenyan phone helpers. Numbers are stored as 2547XXXXXXXX / 2541XXXXXXXX.

export function normalizePhone(input: string): string | null {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("254")) d = d.slice(3);
  else if (d.startsWith("0")) d = d.slice(1);
  if (!/^[17]\d{8}$/.test(d)) return null;
  return `254${d}`;
}

export function formatPhone(stored: string): string {
  const d = stored.replace(/^254/, "");
  return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}

export function phoneMatches(stored: string, query: string): boolean {
  const q = query.replace(/\D/g, "");
  if (q.length < 3) return false;
  const local = stored.replace(/^254/, "");
  return local.includes(q.replace(/^254/, "").replace(/^0/, "")) || stored.includes(q);
}
