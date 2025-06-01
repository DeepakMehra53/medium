import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
}>();

blogRouter.use("*/",async(c,next)=>{
    const authHeader =  c.req.header("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user && user.id) {
            c.set("userId", user.id);
            return next();
        } else {
            return c.json({ error: "Unauthorized" }, 401);
        }
    } catch (error) {
        return c.json({ error: "Invalid token" }, 403);
    }
})




blogRouter.post('/', async(c) => {
    const {title,content,published} =await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const   userId = c.get("userId")
    try {
        const blog = await prisma.post.create({
            data:{
                title,
                content,
                published,
                authorId:Number(userId)
            }
        })
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