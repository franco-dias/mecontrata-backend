import { v4 } from 'uuid';

import User from '../../app/models/User';
import Avatar from '../../app/models/Avatar';
import Announcement from '../../app/models/Announcement';
import Job from '../../app/models/Job';

import Room from '../schemas/Room';

class RoomController {
  async index(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const room = await Room.findOne({
      'userList.id': userId,
      roomId: id,
    });

    const [user] = room.userList.filter((user) => user.id !== userId);

    if (!room) {
      return res.status(400).json({ error: 'Usuário não tem permissão para esta sala, ou ela não existe.' });
    }
    return res.status(200).json({
      title: room.title,
      user,
      roomId: room.roomId,
    });
  }

  async list(req, res) {
    const { userId } = req;

    const rooms = await Room.find({
      'userList.id': userId,
    });

    return res.status(200).json(rooms.map((room) => ({
      updatedAt: room.updatedAt,
      roomId: room.roomId,
      user: room.userList.filter((user) => user.id !== userId),
      title: room.title,
    })));
  }

  async store(req, res) {
    const { userId } = req;
    const { connectTo, announcementId } = req.body;

    const userFindSettings = {
      attributes: ['id', 'name', 'phoneNumber', 'email'],
      include: [{ model: Avatar, as: 'avatar', attributes: ['url'] }],
    };

    const alreadyExists = await Room.find({
      'userList.id': { $all: [userId, connectTo] },
      announcementId,
    });

    if (alreadyExists.length) {
      const [room] = alreadyExists;
      return res.status(409).json({ exists: true, id: room.roomId });
    }

    const requestingUser = await User.findByPk(userId, userFindSettings);

    const requestedUser = await User.findByPk(connectTo, userFindSettings);

    if (!requestingUser || !requestedUser) {
      return res.status(400).json({ error: 'Usuário indisponível para bate-papo.' });
    }

    const announcement = await Announcement.findOne({
      where: {
        id: announcementId,
        userId: connectTo,
      },
      include: [
        { model: Job, as: 'job', attributes: ['description'] },
      ],
      attributes: ['id'],
    });

    if (!announcement) {
      return res.status(400).json({ error: 'Anúncio não existe ou não pertence ao usuário.' });
    }

    const users = [requestingUser, requestedUser];

    const room = await Room.create({
      userList: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: {
          url: user.avatar.url,
        },
      })),
      title: `${requestedUser?.name?.split(' ')[0]} - ${announcement?.job?.description}`,
      roomId: v4(),
      updatedAt: new Date(),
      announcementId,
    });

    return res.status(200).json(room);
  }
}

export default new RoomController();
