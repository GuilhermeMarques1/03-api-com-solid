import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private usersRepository: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(usersRepository: any) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
