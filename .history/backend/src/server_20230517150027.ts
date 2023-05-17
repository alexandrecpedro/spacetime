import 'dotenv/config'
import {}
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const port: number = Number(process.env.PORT) || 3000

app.register(memoriesRoutes)

app.listen({ port }).then((): void => {
  console.log(`🚀 HTTP server running on port http://localhost:${port}`)
})
