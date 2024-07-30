import { Gym, Prisma } from '@prisma/client'
import { FetchNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.items.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.toLowerCase().includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async fetchNearby(params: FetchNearbyParams, page: number) {
    return this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          { latitude: params.userLatitude, longitude: params.userLongitude },
          {
            latitude: item.latitude.toNumber(),
            longitude: item.longitude.toNumber(),
          },
        )

        return distance < 10
      })
      .slice((page - 1) * 20, page * 20)
  }
}
