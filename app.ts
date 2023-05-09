import * as http from 'http';

import { getUsers } from './controllers/userController';

const server = http.createServer((req, res) => {

  if (req.url ==='/api/users' && req.method === "GET") {
    getUsers(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Route not found"}));  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
