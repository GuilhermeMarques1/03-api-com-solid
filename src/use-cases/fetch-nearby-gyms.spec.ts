import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near gym',
      description: null,
      phone: null,
      latitude: -22.0537786,
      longitude: -47.9514631,
    })

    await gymsRepository.create({
      name: 'Far gym',
      description: null,
      phone: null,
      latitude: -22.4034441,
      longitude: -47.5904103,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.0537786,
      userLongitude: -47.9514631,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near gym' })])
  })

  it('should be able to fetch paginated nearby gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Javascript gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.0537786,
        longitude: -47.9514631,
      })
    }

    const { gyms } = await sut.execute({
      userLatitude: -22.0537786,
      userLongitude: -47.9514631,
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript gym 21' }),
      expect.objectContaining({ name: 'Javascript gym 22' }),
    ])
  })
})
