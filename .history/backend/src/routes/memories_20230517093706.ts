import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        creat: true,
      },
    })
    return users
  })
}
