import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import config from '../../src/config';

describe('POST /api/users with Invalid Payload', () => {
  let response;

  beforeAll(async () => {
    response = await request(`http://${config.app.host}:${config.app.port}`)
      .post('/api/users')
      .send({
        username: 'dedy',
        password: '1234'
      });
  });

  it('Should respond bad request', () => {
    expect(response.statusCode).toBe(400);
  });

  it('Should respond fail with error message', () => {
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBeDefined();
  });

  it('Should not respond any data', () => {
    expect(response.body.data).toBeUndefined();
  });
});

// describe('POST /api/users with Valid Payload', () => {
//   let response;

//   beforeAll(async () => {
//     response = await request(`http://${config.app.host}:${config.app.port}`)
//       .post('/api/users')
//       .send({
//         email: 'dedy@a.com',
//         username: 'dedy',
//         password: '1234'
//       });

//     printResponse(response);
//   });

//   it('Should respond \'created\'', () => {
//     expect(response.statusCode).toBe(201);
//   });

//   it('Should respond success', () => {
//     expect(response.body.status).toBe('success');
//   });

//   it('Should respond with valid data', () => {
//     const { data } = response.body;
//     expect(data.id).toBeDefined();
//     expect(Object.keys(data)).toHaveLength(1);

//     config.userData.john.id = data.id;
//   });

//   it('Should create new user', async () => {
//     expect(await Users.countDocuments()).toBe(1);
//     expect(await Authentications.countDocuments()).toBe(0);
//   });
// });
