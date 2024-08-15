import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Near Gym',
        description: 'Lorem ipsum',
        phone: '11999999999',
        latitude: -22.0537786,
        longitude: -47.9514631,
      })

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Far Gym',
        description: 'Lorem ipsum',
        phone: '11999999999',
        latitude: -22.4034441,
        longitude: -47.5904103,
      })

    const response = await supertest(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.0537786,
        longitude: -47.9514631,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Near Gym',
      }),
    ])
  })
})
