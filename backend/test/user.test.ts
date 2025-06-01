import { app } from "../src/app"
import { testClient } from "hono/testing"

import { Hono } from "hono"

describe('User Routes', () => {
    const honoHandler = handle(app);

    it('should signup a new user', async () => {
        const res = await request(honoHandler)
            .post('/api/v1/user/signup')
            .send({
                email: `test${Date.now()}@mail.com`,
                password: 'password123',
                name: 'Test User'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.jwt).toBeDefined();
    });

    // More tests...
});