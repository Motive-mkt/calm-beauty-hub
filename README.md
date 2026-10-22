# Calm Beauty Hub

Landing page and loyalty admin for Calm Beauty Hub, a beauty salon in Syokimau.

- **Public site** (`/`): hero with the 5-visit reward, how it works, services menu (women/men), Google reviews, location, hours and WhatsApp/phone booking.
- **Owner admin** (`/admin`): password login, search clients by name or phone, log paid visits, verify the Google review, track progress to the 5th visit and claim the reward.

Stack: Next.js 15 (App Router), TypeScript, plain CSS, Vercel Blob (private) for client data.

## Run locally

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD at minimum
npm run dev
```

Without `BLOB_READ_WRITE_TOKEN`, client data is stored in `.data/clients.json` (local only).

## Replace before launch

| What | Where |
| --- | --- |
| WhatsApp / phone number | `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_PHONE` |
| Landmark (hidden until set) | `NEXT_PUBLIC_LANDMARK` |
| Opening hours (placeholder) | `lib/site.ts` |
| Services and prices (placeholder) | `lib/services.ts` |
| Google reviews | `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (reviews show only real data) |

## Loyalty rules as built

- A cycle is 5 paid visits. The 5th visit earns the bonus service: free nail art (women) or free facial scrub (men).
- The reward unlocks once the owner has logged 5 paid visits **and** verified the client's Google review.
- Claiming the reward starts a new cycle; the next cycle needs a fresh verified review.
