import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', async () => {
  it('should hash user password upon registration', async () => {
    // const userRepositories = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    console.log(user.password_hash)

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})