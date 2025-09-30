const request = require('supertest');
const app = require('../app');

describe('Reservation API', () => {
  it('should not allow overlapping reservations', async () => {
    // Crée une réservation initiale
    await request(app)
      .post('/api/reservations/create')
      .send({
        resource: 'resourceId', // Remplace par un ID réel
        start_time: '2025-09-28T10:00:00Z',
        end_time: '2025-09-28T12:00:00Z'
      });

    // Tente de créer une réservation qui chevauche
    const res = await request(app)
      .post('/api/reservations/create')
      .send({
        resource: 'resourceId', // Remplace par le même ID
        start_time: '2025-09-28T11:00:00Z',
        end_time: '2025-09-28T13:00:00Z'
      });
    expect(res.statusCode).not.toEqual(201);
  });
});
