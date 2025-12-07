'use server'

import { prisma } from '+/lib/prisma'
import { genSaltSync, hashSync } from 'bcrypt-ts'

export async function register(
  prevState:
    | {
        success: boolean
        message: string
      }
    | undefined,
  formData: FormData
) {
  try {
    let name = formData.get('name') as string
    let email = formData.get('email') as string
    let password = formData.get('password') as string

    const existingUser = await prisma.user.findFirst({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists.',
      }
    } else {
      let salt = genSaltSync(10)
      let hash = hashSync(password, salt)
      await prisma.user.create({
        data: { email, name, password: hash },
      })

      return {
        success: true,
        message: 'Registration successful.',
      }
    }
  } catch (error) {
    console.error('Error during registration:', error)
    return {
      success: false,
      message: 'Something went wrong.',
    }
  }
}
