import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import bcrypt from 'bcryptjs'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string

  }
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header("authentication") || "";
  const token = header.startsWith("Bearer") ? header.slice(7) : null;


  if (!token) {
    c.status(401);
    return c.json({ error: "Token not provided" });
  }
  try {
    const payload = await verify(token, c.env.JWT_SECRET)
    if (payload?.id) {
      await next()
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch {
    c.status(403);
    return c.json({ error: "Invalid token" });
  }


})

app.post('/api/v1/user/signup', async (c) => {
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


app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
     
    }
  })
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    c.status(403)
    return c.json({ error: "Invalid credentials" })
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({ jwt })
})

app.post('/api/v1/blog', (c) => {
  return c.text("Hello signin page")
})

app.put('/api/v1/blog', (c) => {
  return c.text("Hello signin page")
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text("Hello signin page")
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text("Hello signin page")
})

export default app
