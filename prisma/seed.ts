import 'dotenv/config'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { prisma } from '../lib/prisma'

const users = [
  {
    name: 'Hanna Muller',
    email: 'hanna.muller@example.com',
    password: 'password123',
  },
  {
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@example.com',
    password: 'password123',
  },
]

async function main() {
  for (const user of users) {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(user.password, salt)

    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name },
      create: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    })
  }
}

main()
  .then(async () => {
    console.log('Seed complete: users created/updated')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
