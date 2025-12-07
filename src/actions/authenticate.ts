'use server'

import { signIn } from '+/auth'
import { AuthError } from 'next-auth'
import { RedirectType, isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from 'next/navigation'

export async function authenticate(
  prevState:
    | {
        success: boolean
        message: string
      }
    | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      redirectTo: '/protected',
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
  } catch (error) {
    let message = 'Something went wrong.'

    if (isRedirectError(error)) redirect('/protected', RedirectType.replace)

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          message = 'Invalid credentials.'
          break
        default:
          message = 'Something went wrong.'
      }
    }

    return {
      success: false,
      message,
    }
  }
}
