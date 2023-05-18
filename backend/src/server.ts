import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()
const port: number = Number(process.env.PORT) || 3334
const secret: string = process.env.JWT_SECRET || 'spacetime'

app.register(cors, {
  // True = Allow all front-end URLs to access
  origin: true,
  // origin: [`http://localhost:${port}`],
})

app.register(jwt, {
  secret,
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port,
    host: '0.0.0.0',
  })
  .then((): void => {
    console.log(`🚀 HTTP server running on port http://localhost:${port}`)
  })
