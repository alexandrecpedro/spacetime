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

  app.get('/memories/:id', async (request: FastifyRequest): Promise<Memory> => {
    const paramsSchema: z.ZodObject<any> = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory: Memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory
  })

  app.post('/memories', async (request: FastifyRequest): Promise<Memory> => {
    const bodySchema: z.ZodObject<any> = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory: Memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'adfb36fe-a0b3-4b75-a41e-16d76a838647',
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request: FastifyRequest): Promise<Memory> => {
    const paramsSchema: z.ZodObject<any> = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema: z.ZodObject<any> = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory: Memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'adfb36fe-a0b3-4b75-a41e-16d76a838647',
      },
    })

    return memory
  })

  app.delete('/memories/:id', async () => {})
}
