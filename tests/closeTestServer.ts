import { Server } from 'http';

export const closeTestServer = async (server: Server) => {
  return new Promise<void>((res) => {
    server.close(() => res());
  });
};
