import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'



const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>();

app.post('/api/v1/user/signup',async(c)=>{
  const prisma= new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const  body = await c.req.json();
   const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
       },
    })
    return c.json({message:"User created",user})
  } catch (error) {
    return c.json({ error: "Failed to create user" }, 500);
  }finally{
    await prisma.$disconnect();
  }

 
})


app.post('/api/v1/user/signin',(c)=>{
  return c.text("Hello signin page")
})

app.post('/api/v1/blog',(c)=>{
  return c.text("Hello signin page")
})

app.put('/api/v1/blog',(c)=>{
  return c.text("Hello signin page")
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.text("Hello signin page")
})

app.get('/api/v1/blog/bulk',(c)=>{
  return c.text("Hello signin page")
})

export default app
