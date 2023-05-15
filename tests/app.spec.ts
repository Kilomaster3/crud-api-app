import request from 'supertest';
import { server } from '../app';
import { closeTestServer } from './closeTestServer';
import { PUser } from '../interfaces/user';

let id: string;
let user: PUser;

const notUuidId = '001';
const notExistId = '499dcef0-7b55-4e04-94c9-e1ff01d419ea';

const requiredFieldsMessage = 'Fill required fields';
const notFoundMessage = 'User not found';

// GET ALL scenarios

describe('GET users requests', () => {
  afterAll(async () => {
    await closeTestServer(server);
  });

  it('Get all users with api/users request', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('Get all users with wrong api/user request', async () => {
    const res = await request(server).get('/api/user');

    expect(res.statusCode).toBe(404);
  });

  it('Get all users without any request from start page', async () => {
    const res = await request(server).get('');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual('Route not found');
  });
});

// POST scenarios

describe('POST user requests', () => {
  afterAll(async () => {
    await closeTestServer(server);
  });

  it('Post user records with api/users/id request', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Alex',
        age: 21,
        hobbies: ['programming', 'swimming'],
      });

    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Alex');
    expect(res.body.age).toBe(21);
    expect(res.body.hobbies).toStrictEqual(['programming', 'swimming']);
  });

  it('Post user records with api/users/id request with wrong field', async () => {
    const res = await request(server).post('/api/users').send({
      name: 88,
    });

    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(requiredFieldsMessage);
  });

  it('Post user records with api/users/id request with wrong field', async () => {
    const res = await request(server).post('/api/users').send({
      username: 'Alex',
      age: '19',
      address: 'Minsk, Pulihova 39',
    });

    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(requiredFieldsMessage);
  });
});

// GET user scenarios

describe('GET user requests', () => {
  afterAll(async () => {
    await closeTestServer(server);
  });

  it('Get user with api/users/id request', async () => {
    const res = await request(server).get(`/api/users/${id}`);
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(user);
  });

  it('Get user with not exist id with api/users/id request', async () => {
    const res = await request(server).get(`/api/users/${notExistId}`);
    user = res.body;

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual(notFoundMessage);
  });
});

// PUT user scenarios

describe('PUT user requests', () => {
  afterAll(async () => {
    await closeTestServer(server);
  });

  it('Put user data with api/users/id request', async () => {
    const res = await request(server).put(`/api/users/${id}`).send({
      age: 21,
    });
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(200);
    expect(res.body.age).toBe(21);
  });

  it('Put user data with not exist with api/users/id request', async () => {
    const res = await request(server).put(`/api/users/${notExistId}`).send({
      age: 78,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe(notFoundMessage);
  });
});

// DELETE scenarios

describe('DELETE user requests', () => {
  afterAll(async () => {
    await closeTestServer(server);
  });

  it('Delete user  with api/users/id request', async () => {
    const res = await request(server).delete(`/api/users/${id}`);
    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual(user);
  });

  it('Delete user with not exist id with api/users/id request', async () => {
    const res = await request(server).delete(`/api/users/${notExistId}`);
    user = res.body;

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual(notFoundMessage);
  });
});

// GET deleted user scenarios

describe('GET deleted user requests', () => {
  afterAll(async () => {
    await closeTestServer(server);
  });

  it('Get deleted user with api/users/id request', async () => {

    const res = await request(server)
      .delete(`/api/users/${id}`)
      .get(`/api/users/${id}`)

    expect(res).toBe(undefined);
  });

  it('Get deleted user with not uuid id with api/users/id request', async () => {
    const res = await request(server)
    .delete(`/api/users/${notUuidId}`)
    .get(`/api/users/${id}`);

    expect(res).toBe(undefined);
  });

  it('Get deleted user with not exist id with api/users/id request', async () => {
    const res = await request('server')
    .delete(`/api/users/${notUuidId}`)
    .get(`/api/users/${id}`);

    expect(res).toBeFalsy();
  });
});
