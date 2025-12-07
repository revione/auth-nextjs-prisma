'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { resetPassword } from '+/src/actions/reset-password'
import { SubmitButton } from '+/src/ui/SubmitButton'

export default function ResetPassword() {
  const [info, dispatch] = useActionState(resetPassword, undefined)

  return (
    <div className="auth-shell page-animate flex items-center justify-center">
      <div className="auth-card card-glow">
        <div className="auth-header">
          <div className="space-y-2">
            <div className="pill">Security</div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Reset your password</h3>
              <p className="text-sm text-slate-500">Choose a strong password to keep your account safe.</p>
            </div>
          </div>
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 shadow-inner shadow-orange-100">
            ◎
          </div>
        </div>

        {typeof info?.success === 'boolean' && (
          <div className="flex h-8 items-end space-x-1 justify-center" aria-live="polite" aria-atomic="true">
            <p className={`text-sm  ${info?.success ? 'text-green-500' : 'text-red-500'}`}>{info?.message}</p>
          </div>
        )}

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

          <SubmitButton>Reset password</SubmitButton>
        </form>

        <div className="flex flex-col gap-3 px-10 pb-10 text-center text-sm text-slate-600">
          <p>
            {'Do you have an account? '}
            <Link href="/login" className="font-semibold text-slate-900 hover:text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
