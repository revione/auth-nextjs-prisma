import { auth, signOut } from '+/auth'

export default async function ProtectedPage() {
  let session = await auth()

  return (
    <div className="auth-shell page-animate flex items-center justify-center">
      <div className="auth-card card-glow max-w-xl">
        <div className="auth-header">
          <div className="space-y-2">
            <div className="pill">Protected</div>
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="text-sm text-slate-500">You are logged in as {session?.user?.email}</p>
          </div>
        </div>
        <div className="auth-body">
          <p className="text-slate-700">
            This area demonstrates a protected route using NextAuth credentials. Sign out and try accessing again to
            see the redirect behavior.
          </p>
          <div className="flex gap-3">
            <a
              href="/"
              className="btn btn-secondary"
            >
              Ir al home
            </a>
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  )
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <button
        type="submit"
        className="btn btn-secondary"
      >
        Sign out
      </button>
    </form>
  )
}
