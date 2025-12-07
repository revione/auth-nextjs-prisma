'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { authenticate } from '+/src/actions/authenticate'
import { SubmitButton } from '+/src/ui/SubmitButton'

const seededUsers = [
  { label: 'Hanna Muller', email: 'hanna.muller@example.com', password: 'password123' },
  { label: 'Carlos Rodriguez', email: 'carlos.rodriguez@example.com', password: 'password123' },
]

export default function LoginForm() {
  const [info, dispatch] = useActionState(authenticate, undefined)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="auth-shell page-animate flex items-center justify-center">
      <div className="auth-card card-glow">
        <div className="auth-header">
          <div className="space-y-2">
            <div className="pill">Welcome back</div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Sign in to your space</h3>
              <p className="text-sm text-slate-500">Access dashboards and protected content.</p>
            </div>
          </div>
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner shadow-blue-100">
            ↻
          </div>
        </div>

        {typeof info?.success === 'boolean' && (
          <div className="flex h-8 items-end space-x-1 justify-center" aria-live="polite" aria-atomic="true">
            <p className={`text-sm ${info?.success ? 'text-emerald-600' : 'text-red-500'}`}>
              {info?.message}
            </p>
          </div>
        )}

        <div className="auth-body">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Quick login (dev)</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {seededUsers.map((user) => (
              <button
                key={user.email}
                type="button"
                className="btn btn-ghost flex-col items-start gap-1 py-3"
                onClick={() => {
                  setEmail(user.email)
                  setPassword(user.password)
                }}
              >
                <span className="text-sm font-semibold text-slate-900">{user.label}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center px-10">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        <form action={dispatch} className="auth-body">
          <div>
            <label htmlFor="email" className="field-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              required
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="*********"
              required
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <SubmitButton>Log in</SubmitButton>
        </form>

        <div className="flex flex-col gap-3 px-10 pb-10 text-center text-sm text-slate-600">
          <p>
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-slate-900 hover:text-blue-600">
              Sign up
            </Link>
            {' for free.'}
          </p>

          <p>
            {"Don't remember the password? "}
            <Link href="/reset-password" className="font-semibold text-slate-900 hover:text-blue-600">
              Reset password
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
