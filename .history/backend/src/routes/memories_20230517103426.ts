import { Memory } from '@prisma/client'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.get('/memories', async (): Promise<Object[]> => {
    const memories: Memory[] = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory: Memory): Object => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request: FastifyRequest): Promise<Object> => {
    const { id } = request.params

    const paramsSchema = z.object()

    return {}
  })

  app.post('/memories', async () => {})

  app.put('/memories/:id', async () => {})

  app.delete('/memories/:id', async () => {})
}