import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequet {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  private gymsRepository: GymsRepository

  constructor(gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequet): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
