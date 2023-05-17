import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { Memory } from '@prisma/client'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory: Memory) => {})
  })
}
