import { v4 } from 'uuid';

import Announcement from '../../app/models/Announcement';
import Message from '../schemas/Message';
import Connection from '../schemas/Connection';

import { sendMessage } from '../../websocket';

class MessageController {
  async list(req, res) {
    const { userId } = req;
    const { ad, otherUser } = req.query;

    const messages = await Message.find({
      sender: [userId, otherUser],
      recipient: [userId, otherUser],
      ad,
    }).sort({ createdAt: 'ascending' });

    return res.json(messages);
  }

  async store(req, res) {
    const { userId: sender } = req;
    const { recipient, ad, text } = req.body;

    const announcement = await Announcement.findByPk(ad);

    if (!announcement) {
      return res.status(401).json({ error: 'Anúncio não existe.' });
    }

    const message = await Message.create({
      seen: false,
      createdAt: new Date(),
      sender,
      recipient,
      ad,
      text,
      messageId: v4(),
    });

    const userConnection = await Connection.findOne({
      userId: recipient,
    });
    if (userConnection) {
      sendMessage({
        socketId: userConnection.socketId,
        type: 'NEW_MESSAGE',
        data: message,
      });
    }

    return res.status(200).json(message);
  }
}

export default new MessageController();
