import { v4 } from 'uuid';

import Message from '../schemas/Message';
import Connection from '../schemas/Connection';
import Room from '../schemas/Room';

import { sendMessage } from '../../websocket';

class MessageController {
  async list(req, res) {
    const { userId } = req;
    const { roomId } = req.params;
    const room = await Room.findOne({
      roomId,
      'userList.id': userId,
    });

    if (!room) {
      return res.status(400).json({ error: 'Usuário não faz parte dessa conversa, ou ela não existe.' });
    }
    const messages = await Message.find({
      roomId,
    }).sort({ createdAt: 'ascending' });

    return res.json(messages);
  }

  async store(req, res) {
    const { userId } = req;
    const { roomId } = req.body;
    const room = await Room.findOne({
      roomId,
      'userList.id': userId,
    });
    if (!room) {
      return res.status(400).json({ error: 'Usuário não faz parte dessa conversa, ou ela não existe.' });
    }
    const { text } = req.body;
    const message = await Message.create({
      seen: false,
      createdAt: new Date(),
      userId,
      roomId,
      text,
      messageId: v4(),
    });

    console.log(JSON.stringify(message, null, 1));

    room.lastMessageId = message.messageId;
    room.updatedAt = new Date();
    room.messageCount += 1;
    room.save();

    const { userList } = room;

    userList.map(async (user) => {
      const userConnection = await Connection.findOne({
        userId: user.id,
      });
      if (userConnection) {
        sendMessage({
          socketId: userConnection.socketId,
          type: 'NEW_MESSAGE',
          data: message,
        });
      }
    });

    return res.status(200).json(message);
  }

  async update(req, res) {
    const { userId } = req;
    const { roomId } = req.params;

    const room = await Room.find({
      'userList.id': userId,
      roomId,
    });
    if (!room) {
      return res.status(401).json({ error: 'Usuário não tem permissões de acesso nessa sala.' });
    }

    await Message.updateMany(
      {
        roomId,
        seen: false,
        userId: { $ne: userId },
      },
      { $set: { seen: true } },
    );
    return res.status(200).json({ message: 'Mensagens marcadas como lidas.' });
  }
}

export default new MessageController();
