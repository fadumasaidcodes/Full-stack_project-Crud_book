const request = require('supertest');
const { app, server } = require('../index.js'); // Use curly braces {}

afterAll(() => {
  if (server) server.close(); // Added a check just in case
});

describe('Bookshop App', () => {
  test('GET / should redirect to login', async () => {
    // app.callback() converts the Koa app into a format Supertest understands
    const res = await request(app.callback()).get('/');
    expect(res.status).toBe(302);
  });

  test('GET /login should return page', async () => {
    const res = await request(app.callback()).get('/login');
    expect(res.status).toBe(200);
  });
});
