# Phase 2, Backend Wiring

Paper-only. Implemented after Drew signs.

## Stack

Supabase Postgres + Auth + Edge Functions (Deno/TS) + Storage. No Vercel, Resend, Railway, Posthog. Stripe and Anthropic/OpenAI/Perplexity are the only allowed third parties.

## Tables

| Table | Purpose |
|---|---|
| `clients` | Profile, status, program_id, start_date, coach_id |
| `programs` | Coach-owned templates (The Shift v1, etc.) |
| `program_days` | Day index + week index, ordered within a program |
| `exercises` | Master library: name, muscle_group, equipment, video_url, default targets, cues |
| `program_day_exercises` | Join: target sets/reps/RPE/rest per exercise per day |
| `workout_logs` | Per-set actuals logged by client |
| `messages` | 1:1 threads, sender/receiver, body, read_at, reactions |
| `check_ins` | Weekly submissions: weight, energy, sleep, adherence, hurdles, wins, coach reply |
| `progress_entries` | Weight + measurements + photo URLs, dated |
| `push_tokens` | APNs/FCM per device per user |
| `intake_forms` | Marketing site leads, shared schema with WLD/SeenRank |

## Edge Functions

- `submit-form` — marketing leads + Calendly webhook intake, writes to `intake_forms`. Pattern lifted from WLD/SeenRank.
- `send-message-push` — push on new `messages` insert.
- `send-checkin-reminder` — weekly `pg_cron`, nudges clients who have not submitted.

## Auth

- Supabase email + password with magic-link fallback.
- `role` in `raw_user_meta_data`: `client` or `coach`. Mirrors ORC pattern at `client/src/context/AuthContext.jsx:247` in `outback-running-club`.
- RLS:
  - Clients see rows where `client_id = auth.uid()`.
  - Coach sees rows where `coach_id = auth.uid()`.

## Onboarding flow (manual, post-Calendly, no Stripe v1)

1. Lead books a free consult via Calendly on the marketing site.
2. Drew runs the 30-minute consult.
3. Drew opens `/admin/clients`, clicks "Invite Client," enters name + email + program template.
4. Supabase sends a magic-link email.
5. Client clicks the link, lands on `/dashboard`, sees assigned program.
6. Payment is out-of-band (Stripe Payment Link emailed manually). Stripe Checkout is a Phase 3 nice-to-have.

## Swap-in files (pre-marked in Phase 1)

Every mocked data source has a `// TODO: Supabase, Phase 2` header. Grep the codebase:

- `app/src/context/AuthContext.jsx`
- `app/src/context/MockDataContext.jsx`
- `app/src/hooks/useMessages.js`
- `app/src/hooks/useProgress.js`
- `app/src/hooks/useWorkouts.js`
- `app/src/hooks/useCheckIns.js`
- `app/src/hooks/useClients.js`
- `app/src/hooks/useLeads.js`
