import _groupBy from 'lodash.groupby';

import Announcement from '../../app/models/Announcement';
import Message from '../schemas/Message';
import asyncForEach from '../../utils/asyncForEach';
import Job from '../../app/models/Job';

class NewMessagesController {
  async list(req, res) {
    const { userId } = req;
    const { onlyNew } = req.query;

    const searchObject = {
      sender: {
        $ne: userId,
      },
    };

    if (onlyNew) {
      searchObject.seen = false;
    }

    const messageList = await Message.find(searchObject);

    const rooms = _groupBy(messageList, (item) => `${item.ad}_${item.recipient}`);
    const response = [];
    await asyncForEach(Object.values(rooms), async (room) => {
      if (room.length) {
        const [message] = room;
        const { ad } = message;
        const announcement = await Announcement.findByPk(ad, {
          attributes: [],
          include: [{
            model: Job,
            as: 'job',
            attributes: ['description'],
          }],
        });
        response.push({
          announcement,
          messages: room,
        });
      }
    });
    return res.json(response);
  }
}

export default new NewMessagesController();
