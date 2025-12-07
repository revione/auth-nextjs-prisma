'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { register } from '+/src/actions/register'
import { SubmitButton } from '+/src/ui/SubmitButton'

export default function LoginForm() {
  const [info, dispatch] = useActionState(register, undefined)

  return (
    <div className="auth-shell page-animate flex items-center justify-center">
      <div className="auth-card card-glow">
        <div className="auth-header">
          <div className="space-y-2">
            <div className="pill">Create account</div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Join the workspace</h3>
              <p className="text-sm text-slate-500">Set up your profile and start collaborating securely.</p>
            </div>
          </div>
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner shadow-emerald-100">
            ✦
          </div>
        </div>

        {typeof info?.success === 'boolean' && (
          <div className="flex h-8 items-end space-x-1 justify-center" aria-live="polite" aria-atomic="true">
            <p className={`text-sm  ${info?.success ? 'text-emerald-600' : 'text-red-500'}`}>
              {info?.message}
            </p>
          </div>
        )}

        <form action={dispatch} className="auth-body">
          <div>
            <label htmlFor="name" className="field-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jemand"
              autoComplete="name"
              required
              className="field-input"
            />
          </div>
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
            />
          </div>

          <SubmitButton>Create account</SubmitButton>
        </form>

        <div className="flex flex-col gap-3 px-10 pb-10 text-center text-sm text-slate-600">
          <p>
            {'Do you have an account? '}
            <Link href="/login" className="font-semibold text-slate-900 hover:text-blue-600">
              Log in
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
