import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3333
const host = '0.0.0.0' // Isso permite conexões de qualquer IP

app
  .listen({
    port: port,
    host: host,
  })
  .then(() => {
    console.log(`HTTP server running on http://${host}:${port}`)
  })
  .catch((err) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })