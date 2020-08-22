import Announcement from '../app/models/Announcement';

import { announcementInclude } from './AnnouncementController';

class UserAnnouncementController {
  async list(req, res) {
    const userId = req.params.userId || req.userId;
    const {
      page, perPage, orderBy, order,
    } = req.query;

    const announcementOrder = [];

    if (orderBy && order) {
      announcementOrder.push([orderBy, order]);
    }

    const announcements = await Announcement.findAndCountAll({
      where: {
        userId,
      },
      order: announcementOrder,
      include: announcementInclude,
      limit: perPage,
      offset: perPage * (page - 1),
    });

    const { count, rows } = announcements;

    return res.status(200).json({
      count,
      list: rows,
    });
  }
}

export default new UserAnnouncementController();
