import * as http from 'http';
import cluster from 'cluster';
import os from 'os';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/userController';

import 'dotenv/config';

const numSpu = os.cpus().length;

export const server = http.createServer((req, res) => {
  const path = '/api/users';
  const id = req.url.split('/')[3];

  try {
    if (req.url === path && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url === path && req.method === 'POST') {
      createUser(req, res);
    } else if (req.url.match(/\/api\/users\/\w+/)) {
      if (req.method === 'GET') {
        getUserById(req, res, id);
      } else if (req.method === 'PUT') {
        updateUser(req, res, id);
      } else if (req.method === 'DELETE') {
        deleteUser(req, res, id);
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'No answer from server' }));
    console.log(err);
    res.end();
  }
});

if (process.env.NODE_ENV !== 'test') {
  if (cluster.isPrimary) {
    for (let i = 0; i < numSpu; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
    })
  } else {
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}, process identifier: ${process.pid}`)
    );
  }
}
