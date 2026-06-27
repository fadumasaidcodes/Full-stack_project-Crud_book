const request = require('supertest');
const { app, server } = require('../index');

afterAll(() => {
  server.close();
});

describe('Bookshop App', () => {
  test('GET / should redirect to login', async () => {
    const res = await request(app.callback()).get('/');
    expect(res.status).toBe(302);
  });

  test('GET /login should return page', async () => {
    const res = await request(app.callback()).get('/login');
    expect(res.status).toBe(200);
  });
});