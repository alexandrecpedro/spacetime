import { Prisma } from '@prisma/client'
import { FastifyInstance } from 'fastify'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await Prisma.user.findMany()
    return users
  })
}
