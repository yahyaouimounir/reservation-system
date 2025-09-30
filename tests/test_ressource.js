const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: 'testid', role: 'admin' },
  'RANDOM_TOKEN_SECRET',
  { expiresIn: '24h' }
);

describe('Ressource API', () => {
  it('should create a ressource', async () => {
    const res = await request(app)
      .post('/api/ressources/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Salle Test',
        capacity: 5,
        location: 'Test Etage'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Ressource created !');
  });
});