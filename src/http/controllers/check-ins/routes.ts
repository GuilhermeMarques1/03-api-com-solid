import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { history } from './history.controller'
import { metrics } from './metrics.controller'
import { create } from './create.controller'
import { validate } from './validate.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-in', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}