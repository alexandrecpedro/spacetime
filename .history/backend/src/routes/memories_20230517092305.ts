import { FastifyInstance } from 'fastify'

export async function memoriesRoutes(app: FastifyInstance) {
    app.get('/users', async () => {
        const users = await prisma.user.findMany()
        return users
      })
}
