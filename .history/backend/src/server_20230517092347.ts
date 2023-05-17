import 'dotenv/config'
import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const port: number = Number(process.env.PORT) || 3000

app.listen({ port }).then((): void => {
  console.log(`🚀 HTTP server running on port http://localhost:${port}`)
})
