# ShiftLink Take-Home

ShiftLink is a two-sided healthcare staffing marketplace prototype with separate paths for professionals and facilities.

## Stack Decisions

- Next.js App Router + TypeScript for fast route composition and clean DX
- Tailwind CSS + shadcn/ui primitives for rapid UI development with custom visual tuning
- React Hook Form + Zod for typed validation and branch-aware form handling
- TanStack Query for mock async query/mutation patterns that mirror real API behavior
- Local state + localStorage for mock auth/session and shift claim persistence (no backend)

## Feature Coverage

- Landing page with:
  - dual CTA and two user paths
  - trust signals
  - role-specific value proposition
- Sign-up flow with branching by user type (`professional`, `facility`)
- Hard-coded auth for two demo accounts
- Professional shift board with:
  - open shift cards (role, facility, date, time, rate)
  - filters by role and date
  - claim action + confirmation state
- Facility dashboard placeholder route

## Test Credentials

- Professional account:
  - `pro@shiftlink.com`
  - `ShiftLink123!`
- Facility account:
  - `facility@shiftlink.com`
  - `ShiftLink123!`

## Routes

- `/` landing page
- `/signup` branched sign-up
- `/login` sign in
- `/board` professional shift board
- `/dashboard/facility` facility placeholder view

## Local Run

Install and run:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes on Design Direction

- Product direction references:
  - uPaged style two-sided path clarity (conceptual)
  - eucalyptus.health style restraint and whitespace rhythm (visual register)
- Typography and spacing are intentionally editorial and calm rather than dashboard-generic.
- The implementation avoids backend scope creep and focuses on evaluable UX and interaction quality.

## Next If Backend Were Added

1. Replace mock auth with secure session/JWT flow.
2. Move shifts and claim logic to API + DB.
3. Add professional profile verification and facility posting workflow.
4. Add pagination/sorting for larger shift datasets.
