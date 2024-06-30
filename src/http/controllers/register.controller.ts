import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerUserSchema.parse(req.body)

  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })

  return reply.status(201).send()
}