import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
