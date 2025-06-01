// user.test.ts
import { testClient } from 'hono/testing'
import { describe, it, expect } from 'vitest'
import { userRouter } from '../src/route/user'
import { Hono } from 'hono'


describe('User Routes', () => {
    const client = testClient(userRouter, {
        env: {
            DATABASE_URL: 'your_test_db_url',
            JWT_SECRET: 'your_test_secret'
        }
    })

    it('should signup a new user', async () => {
        const res = await client['/signup'].$post({
            json: {
                email: `test${Date.now()}@mail.com`,
                password: 'password123',
                name: 'Test User'
            }
        })

        expect(res.status).toBe(200)
        const data = await res.json()
        expect(data.jwt).toBeDefined()
    })

    // Add a signin test if needed
})
