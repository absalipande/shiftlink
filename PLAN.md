# ShiftLink Take-Home Implementation Plan

## Objective
Build a polished, responsive prototype of ShiftLink, a two-sided marketplace for healthcare professionals and facilities, with equal emphasis on functional behavior and design quality.

## Stack
- Next.js (App Router, TypeScript)
- React
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

## Product Scope
1. Landing page:
- Two clear user paths (professionals and facilities)
- Dual CTAs
- Trust signals
- Value proposition for each audience

2. Sign-up flow:
- Branch by user type (`professional` or `facility`)
- Collect minimal relevant fields
- Mock submit (no backend)

3. Auth flow:
- Hard-coded credentials for two accounts
- Session persisted in local storage
- Route-level access control

4. Shift board (professional view):
- Browse open shifts
- Shift card fields: role, facility name, date, time, rate
- Filter by role and date

5. Shift claim:
- Claim action for professionals
- Immediate confirmation state
- Local state/mock persistence only

## Hard-Coded Accounts
- Professional:
  - Email: `pro@shiftlink.com`
  - Password: `ShiftLink123!`
- Facility:
  - Email: `facility@shiftlink.com`
  - Password: `ShiftLink123!`

## Route Map
- `/` Landing page
- `/signup` Branching sign-up form
- `/login` Sign-in page
- `/board` Professional shift board
- `/dashboard/facility` Facility placeholder dashboard

## Architecture Notes
- Use server components for static marketing sections and page shells.
- Use client components for interactive features:
  - auth provider + guards
  - forms
  - filters
  - claim mutations
- Use a local mock data layer with TanStack Query to model realistic async fetch/mutation flows.
- Use Zod schemas shared between form validation and type inference.

## Design Direction
- Inspired by eucalyptus.health:
  - restrained typography
  - editorial rhythm
  - generous whitespace
  - deliberate hierarchy
- Inspired by uPaged:
  - explicit two-sided value proposition
  - immediate path selection via dual CTA
- Avoid generic component-library defaults by defining:
  - custom spacing cadence
  - custom text scale application
  - tailored color tokens and subtle accents

## Milestones
1. Project scaffolding and dependency setup
2. Base UI system and layout primitives
3. Auth/session infrastructure
4. Landing page implementation
5. Sign-up flow implementation
6. Shift board + filter implementation
7. Claim flow + confirmation states
8. README documentation and polish pass

## Acceptance Checklist
- Landing page communicates both user paths clearly
- Sign-up branches correctly by user type
- Login works for both hard-coded accounts
- Professional can browse, filter, and claim shifts
- Claimed state is visually clear and retained during session
- Facility account routes to facility dashboard placeholder
- Responsive behavior works on mobile and desktop
- README explains setup, decisions, and credentials
