# Mary And Kitchen: launch checklist

Live preview: https://mary-and-kitchen-tau.vercel.app
Repo: https://github.com/iam7erek/MaryAndKitchen (pushes to `main` deploy to production)
Vercel project: `mary-and-kitchen` in the SEVENTOR team

## 1. Point the Spaceship domain at Vercel

1. In Vercel: Project `mary-and-kitchen` > Settings > Domains > Add. Add both `[DOMAIN]` and `www.[DOMAIN]`, and choose which one is primary (the other will redirect to it).
2. In Spaceship: Domain List > `[DOMAIN]` > Manage > DNS records (Advanced DNS). Delete the default parking/URL-redirect records for `@` and `www`, then add:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Automatic / 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

Vercel's Domains page shows the exact values it wants for your project once the domain is added. If it shows a different A record IP or a project-specific CNAME, use the values it shows; they replace the two above.

3. Wait until both rows in Vercel turn to "Valid Configuration" (usually minutes, sometimes a few hours). Vercel issues the HTTPS certificate on its own.
4. In Vercel > Settings > Environment Variables, set `SITE_URL` = `https://[DOMAIN]` (Production), then redeploy so canonical and Open Graph links use the real domain.

## 2. Resend (order emails to Mary)

Until a domain is verified, Resend can only send from `onboarding@resend.dev`, and only to the email address that owns the Resend account. So the form works today if `ORDER_TO_EMAIL` is that same address.

To send from your own domain:

1. Sign in at resend.com > Domains > Add Domain. Use a subdomain, for example `send.[DOMAIN]`, and pick the region closest to the UAE (Ireland, `eu-west-1`).
2. Resend shows the DNS records to add. Add each one in Spaceship > DNS records exactly as shown (copy and paste the values; the DKIM key is long):

| Type | Host (in Spaceship) | Value | Priority |
|---|---|---|---|
| MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | |
| TXT | `resend._domainkey` | `p=...` (the DKIM key Resend shows) | |
| TXT (recommended) | `_dmarc` | `v=DMARC1; p=none;` | |

3. Back in Resend, press Verify. When it says Verified, create an API key: API Keys > Create, permission "Sending access", limited to that domain.
4. In Vercel > Settings > Environment Variables (Production and Preview):

| Name | Value |
|---|---|
| `RESEND_API_KEY` | the key from step 3 (starts with `re_`) |
| `ORDER_TO_EMAIL` | Mary's inbox, `[MARY_EMAIL]` |
| `ORDER_FROM_EMAIL` | `Mary And Kitchen <orders@send.[DOMAIN]>` |

5. Redeploy (Deployments > ... > Redeploy), then send yourself a test order from the site.

The key never goes in the code or the repo; `.env` is git-ignored.

## 3. Placeholders still to fill

| What | Where | Notes |
|---|---|---|
| `[PRICE]` for all 9 bakes | `src/data/products.ts` | Shown as "AED [PRICE]" on the tray |
| `[REAL MESSAGE]` + `[CUSTOMER NAME]` (5 notes) | `src/data/loveNotes.ts` | Paste real customer messages only |
| `[MARY_EMAIL]` | Vercel env `ORDER_TO_EMAIL` | Where order slips arrive |
| `[DOMAIN]` | Vercel Domains, env `SITE_URL`, `ORDER_FROM_EMAIL`, Resend | |
| Carrot cake drawing and photo | `src/data/products.ts` | Uses the plain bento drawing until one exists |
| Red velvet square drawing | `src/data/products.ts` | Uses the bento drawing (closest match in the brand set) |
| Photos of cookies, cheesecakes, chocolate cake, Squares | `src/assets/brand/photos/` + `src/data/products.ts` | Cards show "Photo coming soon" until added |
| Instagram link | `src/data/site.ts` | Assumed `https://www.instagram.com/maryandkitchen/` |
| One-line descriptions for the Squares | `src/data/products.ts` | Kept to facts; reword in Mary's voice if you like |
| Arabic version | `src/data/copy.ar.ts` (new) | Layout already uses logical CSS; Arabic logo comes last |

## 4. Notes

- `stamps/stamp-baked-by-hand.svg` is not used: its ring text is cut ("HEA"), as `MISSING.md` explains. Fix it on the canvas and it can go on the tray.
- The repo is public, so the brand files and photos in it are visible to anyone. Switch it to private on GitHub if you'd rather not.
