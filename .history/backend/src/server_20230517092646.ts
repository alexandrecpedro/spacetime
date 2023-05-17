import 'dotenv/config'
import fastify from 'fastify'

const app = fastify()
const port: number = Number(process.env.PORT) || 3000

app.register()

app.listen({ port }).then((): void => {
  console.log(`🚀 HTTP server running on port http://localhost:${port}`)
})
