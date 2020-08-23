import { Op } from 'sequelize';
import Announcement from '../app/models/Announcement';

import Category from '../app/models/Category';
import User from '../app/models/User';
import AdPhoto from '../app/models/AdPhoto';
import { announcementInclude } from './AnnouncementController';

class SearchAnnouncementController {
  async list(req, res) {
    const { s, page, perPage } = req.query;
    const byCategory = await Announcement.findAll(
      {
        include: [
          {
            model: Category,
            as: 'category',
            where: {
              description: {
                [Op.like]: `%${s}%`,
              },
            },
            attributes: ['description'],
          },
        ],
        attributes: ['id'],
      },
    );
    const byDescription = await Announcement.findAll({
      where: {
        description: {
          [Op.like]: `%${s}%`,
        },
      },
      attributes: ['id'],
    });

    const ids = byCategory.concat(byDescription).map((item) => item.id);

    const announcements = await Announcement.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      includes: announcementInclude,
      limit: perPage,
      offset: perPage * (page - 1),
    });

    return res.status(200).json(announcements);
  }
}

export default new SearchAnnouncementController();
