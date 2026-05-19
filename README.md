# Personal Fitness, Dr. Drew DPT Pitch Build

Pitch deliverable for `@not_ur_average_dr` (Dr. Drew, DPT). Four-surface demo built frontend-first with mocked data. Backend wiring is Phase 2, see `PHASE2_BACKEND.md`.

## Surfaces

| Surface | Path | Demo URL (TBD) |
|---|---|---|
| Marketing site | `site/` | `drew-preview.d1fpc3.com` |
| Portal + Admin SPA | `app/` | `drew-app-preview.d1fpc3.com` |
| PWA (installable) | from `app/` | same URL, Add to Home Screen |
| iOS / Android native shells | `ios/`, `android/` | Phase 1.5, post-signature |

## Local dev

**Marketing site** (static, no build):
```
cd site
# open index.html directly, or:
npx serve .
```

**Portal app** (Vite):
```
cd app
npm install
npm run dev
```

## Deploy

Both surfaces auto-deploy to Hostinger on push to `main` via GitHub Actions FTP.

Secrets needed in repo settings: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_APP_SERVER_DIR`, `FTP_SITE_SERVER_DIR`.

## Phase 2 swap-in checklist

When Drew signs, search for `// TODO: Supabase` across `app/src/` and follow `PHASE2_BACKEND.md`. Every mocked data source has a marked swap-in point.

## Repo

`d1fpc3/personalfitness` on GitHub, branch `main`.
