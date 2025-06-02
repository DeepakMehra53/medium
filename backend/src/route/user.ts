import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs'
import { signupInput } from "../zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const { email, password, name } = body
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name
      },
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token })
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: "Failed to create user" }, 500);
  }


})


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password
    }
  })
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    c.status(403)
    return c.json({ error: "Invalid credentials" })
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({ jwt })
})
