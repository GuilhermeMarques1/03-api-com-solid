import { Gym, Prisma } from '@prisma/client'

export interface FetchNearbyParams {
  userLatitude: number
  userLongitude: number
}
export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  fetchNearby(params: FetchNearbyParams, page: number): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  findById(gymId: string): Promise<Gym | null>
}
