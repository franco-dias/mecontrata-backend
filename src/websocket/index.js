import socketio from 'socket.io';

import { verifyToken } from '../middlewares/ensureAuth';
import ConnectionController from '../mongoose/controllers/ConnectionController';

let io;

export default function setupWebSocket(server) {
  io = socketio(server);
  io.on('connection', (socket) => {
    const { authorization } = socket.handshake.query;
    let userId;
    verifyToken({
      authorization,
      onSuccess: async (id) => {
        userId = id;
        await ConnectionController.delete({
          userId,
        });
        await ConnectionController.store({
          userId,
          socketId: socket.id,
        });
        console.log(`new Connection from user ${userId}`);
      },
      onError: socket.disconnect,
    });

    socket.on('disconnect', async () => {
      console.log(`disconnected user ${userId}`);
      await ConnectionController.delete({ userId });
    });
  });
}

export const sendMessage = ({ socketId, type, data }) => {
  io.to(socketId).emit(type, data);
};
