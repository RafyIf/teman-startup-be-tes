import supertest from 'supertest'
import app from '../../app'

describe('GET /api/orders', () => {
  it('should return 200', async () => {
    const response = await supertest(app).get('/api/orders')
    expect(response.status).toBe(200)
  })
})
