import { Memory } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', async (request: FastifyRequest): Promise<void> => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request: FastifyRequest): Promise<Object[]> => {
    const memories: Memory[] = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
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

  app.get(
    '/memories/:id',
    async (request: FastifyRequest, reply: FastifyReply): Promise<Memory> => {
      const paramsSchema: z.ZodObject<any> = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const memory: Memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (!memory.isPublic && memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      return memory
    },
  )

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
        userId: request.user.sub,
      },
    })

    return memory
  })

  app.put(
    '/memories/:id',
    async (request: FastifyRequest, reply: FastifyReply): Promise<Memory> => {
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

      let memory: Memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      memory = await prisma.memory.update({
        where: {
          id,
        },
        data: {
          content,
          coverUrl,
          isPublic,
        },
      })

      return memory
    },
  )

  app.delete(
    '/memories/:id',
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      const paramsSchema: z.ZodObject<any> = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      await prisma.memory.delete({
        where: {
          id,
        },
      })
    },
  )
}
