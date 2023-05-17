import { Memory } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.get('/memories', async (): Promise<Memory[]> => {
    const memories: Memory[] = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory: Memory): Object<Memory> => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {})

  app.post('/memories', async () => {})

  app.put('/memories/:id', async () => {})

  app.delete('/memories/:id', async () => {})
}