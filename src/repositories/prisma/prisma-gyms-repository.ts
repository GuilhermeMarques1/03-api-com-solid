import { Prisma, Gym } from '@prisma/client'
import { FetchNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async fetchNearby(params: FetchNearbyParams, page: number) {
    const offset = (page - 1) * 20

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${params.userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.userLongitude}) ) + sin( radians(${params.userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT 20 OFFSET ${offset} 
    `

    return gyms
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }
}
