import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs'
import { signinInput,signupInput } from "@deepakmehra53/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

const getPrisma = (env: { DATABASE_URL: string }) => {
  return new PrismaClient({ datasourceUrl: env.DATABASE_URL }).$extends(withAccelerate())

}

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({
      message: "Input are not correct"
    })
  }
  const prisma = getPrisma(c.env)

  try {
    const { username: email, password, name } = body
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
  const body = await c.req.json()
  const {success}= signinInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      meassage:"Input are not correct"
    })
  }
  const prisma = getPrisma(c.env)
  const{username:email} =body;
  const user = await prisma.user.findFirst({
    where: {
      email
     
    }
  })
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    c.status(403)
    return c.json({ error: "Invalid credentials" })
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({ jwt })
})
