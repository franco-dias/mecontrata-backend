import Announcement from '../app/models/Announcement';

import { announcementInclude } from './AnnouncementController';

class CategoryAnnouncementController {
  async list(req, res) {
    const { categoryId } = req.params;
    const {
      page, perPage, orderBy, order,
    } = req.query;

    const announcementOrder = [];

    if (orderBy && order) {
      announcementOrder.push([orderBy, order]);
    }

    const announcements = await Announcement.findAndCountAll({
      where: {
        categoryId,
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

export default new CategoryAnnouncementController();
