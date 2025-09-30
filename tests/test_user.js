describe('User API', () => {
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

const token = jwt.sign(
  { userId: 'testid', role: 'admin' },
  'RANDOM_TOKEN_SECRET',
  { expiresIn: '24h' }
);

beforeAll(async () => {
  await User.deleteMany({ email: 'testuser@example.com' });
});

describe('User API', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/auth/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TestUser',
        email: 'testuser@example.com',
        password: 'password',
        role: 'user'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
});