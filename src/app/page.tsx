import Link from 'next/link'
import { auth } from '+/auth'

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <main className="auth-shell page-animate flex items-center justify-center">
      <div className="auth-card card-glow w-full max-w-4xl">
        <div className="auth-header">
          <div className="space-y-2">
            <div className="pill">Auth playground</div>
            <h1 className="text-3xl font-semibold text-slate-900">Explore the flows</h1>
            <p className="text-sm text-slate-500">
              Try login, sign up, and reset flows in a safe space built with Next.js + NextAuth + Prisma.
            </p>
          </div>
        </div>
        <div className="auth-body">
          {isLoggedIn ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/protected" className="btn btn-primary justify-between px-4 py-3 text-sm">
                Go to protected zone
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Link href="/login" className="btn btn-primary justify-between px-4 py-3 text-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-secondary justify-between px-4 py-3 text-sm">
                Register
              </Link>
              <Link href="/reset-password" className="btn btn-secondary justify-between px-4 py-3 text-sm">
                Reset Password
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
