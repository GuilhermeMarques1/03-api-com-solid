import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/prisma/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

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
