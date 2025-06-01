import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("*/", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    const user = await verify(token, c.env.JWT_SECRET)
    if (user) {
        c.set("userId", String(user.id))
        return next()
    } else {
        c.status(403)
        return c.json({
            msg: "You are not logged in "
        })
    }
})




blogRouter.post('/', async (c) => {
    const { title, content, published } = await c.req.json()
    const autherId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId: Number(autherId)
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (error) {
        return c.json({ error: "Failed to create post" }, 500);
    }



})

blogRouter.put('/', async (c) => {
    const { title, content, id } = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.update({
            where: {
                id: id
            }, data: {
                title,
                content

            }
        })
        return c.json({
            id: blog.id
        })
    } catch (error) {
        return c.json({ error: "Failed to create post" }, 500);

    }
})

blogRouter.get('/:id', async(c) => {
    const {id}= await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blogs =  await prisma.post.findFirst({
            where:{
                id:id
            }
        })
        return c.json({
            blogs
        })
    } catch (error) {
        return c.json({ error: "Failed to create post" }, 500)
    }
})

blogRouter.get('/bulk', (c) => {
    return c.text("Hello signin page")
})