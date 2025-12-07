# Sample Next.js Auth

Authentication playground built with Next.js 16 (App Router) and NextAuth v5 using Credentials, Prisma, and libSQL/SQLite. Includes login, register, and password reset flows plus a protected route to test redirects and sign-out.

## Stack
- Next.js 16 + TypeScript (App Router)
- NextAuth v5 with `Credentials` provider
- Prisma + `@prisma/adapter-libsql` (SQLite locally or LibSQL/Turso)
- Password hashing with `bcrypt-ts`
- Tailwind CSS 4 and custom styles in `src/app/globals.css`

## Requirements
- Node 20+ and pnpm
- Environment variables in `.env`

## Getting started
1) Install dependencies  
`pnpm install`

2) Copy env vars and set a secret  
`cp env.example .env`  
Update `AUTH_SECRET` (e.g. `openssl rand -base64 32`). `DATABASE_URL` defaults to `file:./prisma/dev.db` but can point to a LibSQL/Turso endpoint.

3) Generate Prisma client and create the database  
`pnpm prisma generate`  
`pnpm prisma db push`

4) Seed sample data  
`pnpm db:seed`

5) Run locally  
`pnpm dev` → http://localhost:3000

## Flows and routes
- `/` landing with quick links
- `/login` credentials sign-in
- `/register` user registration
- `/reset-password` change password
- `/protected` guarded route; middleware in `src/proxy.ts` redirects when unauthenticated

## Seed users
- `hanna.muller@example.com` / `password123`
- `carlos.rodriguez@example.com` / `password123`

## Quick structure
- `auth.ts`: NextAuth config and credentials provider
- `src/actions/*`: Server Actions for login, register, reset
- `lib/prisma.ts`: Prisma client with libSQL adapter
- `prisma/schema.prisma`: `User` model
- `src/app/**`: views and forms for the flows

## Useful scripts
- `pnpm dev` start in development
- `pnpm build` / `pnpm start` production build & serve
- `pnpm lint` run ESLint
- `pnpm db:seed` populate demo users
