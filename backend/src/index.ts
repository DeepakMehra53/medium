import { Hono } from 'hono'
import { userRouter ,blogRouter} from './route/user';



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string

  }
}>();

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

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




export default app
