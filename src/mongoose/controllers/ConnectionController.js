import Connection from '../schemas/Connection';

class ConnectionController {
  async store({ userId, socketId }) {
    const connection = await Connection.create({
      userId,
      socketId,
    });

    return connection;
  }

  async delete({ userId }) {
    return Connection.deleteOne({
      userId,
    }).exec();
  }
}

export default new ConnectionController();
