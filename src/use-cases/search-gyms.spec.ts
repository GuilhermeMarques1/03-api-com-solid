import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -22.0537786,
      longitude: -47.9514631,
    })

    await gymsRepository.create({
      name: 'TypeScript gym',
      description: null,
      phone: null,
      latitude: -22.0537786,
      longitude: -47.9514631,
    })

    const { gyms } = await sut.execute({
      query: 'javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Javascript gym' })])
  })

  it.skip('should be able to search for paginated gyms', async () => {
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
      query: 'javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript gym 21' }),
      expect.objectContaining({ name: 'Javascript gym 22' }),
    ])
  })
})
