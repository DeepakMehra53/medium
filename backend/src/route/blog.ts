import { Hono } from "hono";

export const blogRouter = new Hono()

blogRouter.post('/', (c) => {
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