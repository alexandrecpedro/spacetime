import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return users
  })
}
