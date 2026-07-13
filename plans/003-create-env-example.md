# Plan 003: Create Onboarding Environment Config Guide

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git status --porcelain` to check if a `.env.example` file already exists. If yes, stop and report.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `08722f6`, 2026-07-13

## Why this matters

The repository lacks documentation or helper guides for environment variable configuration. This increases onboarding friction for new developers who need to configure `DATABASE_URL` for Neon serverless database connectivity. Creating `.env.example` provides a clear documentation standard.

## Current state

- Relevant Files:
  - `.env.example` (does not exist in the root)
  - `db/index.ts` — reads `process.env.DATABASE_URL`.

## Scope

**In scope**:
- `.env.example` (NEW)

**Out of scope**:
- Any existing local `.env` files. **Never commit raw secret credentials or production database URIs.**

## Git workflow

- Branch: `advisor/003-create-env-example`
- Commit message format: `docs(env): add .env.example configuration template`

## Steps

### Step 1: Create .env.example File
Create a new file named `.env.example` in the root directory containing descriptive instructions for setting up environment variables.

Target Content Shape:
```
# Portfoliodev Database Configuration
# Paste your Neon Database serverless connection URI here
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

**Verify**: Check that `.env.example` exists on disk and does not contain any sensitive keys/secrets.

## Done criteria

- [ ] `.env.example` exists in the root folder.
- [ ] No database credentials are committed.
- [ ] `plans/README.md` status row updated to DONE.

## STOP conditions

- If you accidentally write secrets or active database URIs to `.env.example`.
