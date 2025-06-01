import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}>();

blogRouter.use("*/",(c,next)=>{
    next();
})




blogRouter.post('/', async(c) => {
    const {title,content,published,author} =await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        
    } catch (error) {
        
    }


    return c.text("Hello signin page")
})

blogRouter.put('/', (c) => {
    return c.text("Hello signin page")
})

blogRouter.get('/:id', (c) => {
    return c.text("Hello signin page")
})

blogRouter.get('/bulk', (c) => {
    return c.text("Hello signin page")
  })