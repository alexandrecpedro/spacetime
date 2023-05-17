import 'dotenv/config'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const port: number = Number(process.env.PORT) || 3000

app.register(cors, {
  // True = Allow all front-end URLs to access
  origin: true,
})
app.register(memoriesRoutes)

app.listen({ port }).then((): void => {
  console.log(`🚀 HTTP server running on port http://localhost:${port}`)
})
