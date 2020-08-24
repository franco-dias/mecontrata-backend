import { Op } from 'sequelize';
import Announcement from '../app/models/Announcement';

import Category from '../app/models/Category';
import { announcementInclude } from './AnnouncementController';
import Job from '../app/models/Job';
import User from '../app/models/User';
import Avatar from '../app/models/Avatar';

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

    const byJob = await Announcement.findAll(
      {
        include: [
          {
            model: Job,
            as: 'job',
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

    const ids = byCategory.concat(byDescription).concat(byJob).map((item) => item.id);
    const announcements = await Announcement.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      include: announcementInclude,
      limit: perPage,
      offset: perPage * (page - 1),
    });

    return res.status(200).json(announcements);
  }
}

export default new SearchAnnouncementController();
