import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput, } from '@deepakmehra53/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();


const getPrisma = (env: { DATABASE_URL: string }) => {
    return new PrismaClient({ datasourceUrl: env.DATABASE_URL }).$extends(withAccelerate())

}


blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set('userId', String(user.id))
            await next()
        } else {
            c.status(403)
            return c.json({
                msg: "You are not logged in"
            })
        }
    } catch (error) {
        c.status(403)
        return c.json({
            msg: "You are not logged in"
        })
    }

})




blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const { title, content } = body
    const { success } = createBlogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            meassage: "Input are not correct"
        })
    }
    const autherId = c.get("userId")

    if (!autherId || isNaN(Number(autherId))) {
        return c.json({ error: "Invalid or missing user ID" }, 400);
    }
    const prisma = getPrisma(c.env)
    try {
        const blog = await prisma.post.create({
            data: {
                title,
                content,
                authorId: Number(autherId)
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (error) {
        console.error(error)
        return c.json({ error: "Failed to create post" }, 500);
    }



})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            meassage: "Input are not correct"
        })
    }
    const prisma = getPrisma(c.env)
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            }, data: {
                title: body.title,
                content: body.content

            }
        })
        return c.json({
            id: blog.id
        })
    } catch (error) {
        return c.json({ error: "Failed to create post" }, 500);

    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = getPrisma(c.env)
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')
    const skip = (page - 1) * limit;
    try {
        const blog = await prisma.post.findMany({
            skip,
            take: limit,
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }


            }

        })
        return c.json({ page, limit, data: blog })
    } catch (error) {
        return c.json({ error: "Failed to create post" }, 500)
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = getPrisma(c.env)
    try {
        const blogs = await prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        })
        return c.json({
            blogs
        })
    } catch (error) {
        return c.json({ error: "Failed to create post" }, 500)
    }
})

