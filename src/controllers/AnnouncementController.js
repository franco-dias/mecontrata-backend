import * as yup from 'yup';

import Announcement from '../app/models/Announcement';
import AdPhoto from '../app/models/AdPhoto';

import asyncForEach from '../utils/asyncForEach';
import Category from '../app/models/Category';
import User from '../app/models/User';

const validation = yup.object().shape({
  description: yup.string().required(),
  categoryId: yup.number().required(),
});

export const announcementInclude = [
  {
    model: Category,
    as: 'category',
    attributes: [
      'description',
      'color',
    ],
  },
  {
    model: User,
    as: 'user',
    attributes: [
      'name',
      'email',
      'phoneNumber',
    ],
  },
  {
    model: AdPhoto,
    as: 'photos',
    attributes: [
      'url',
    ],
  },
];

class AnnouncementController {
  async index(req, res) {
    const { id } = req.params;
    const announcement = await Announcement.findByPk(id, {
      include: announcementInclude,
    });
    return res.status(200).json(announcement);
  }

  async list(req, res) {
    const {
      page, perPage, orderBy, order,
    } = req.query;

    const announcementOrder = [];

    if (orderBy && order) {
      announcementOrder.push([orderBy, order]);
    }

    const announcements = await Announcement.findAndCountAll({
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

  async store(req, res) {
    const { userId } = req;
    req.body.userId = userId;
    const { description, categoryId } = req.body;

    try {
      validation.validateSync({
        description,
        categoryId,
      }, { abortEarly: false });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e.errors });
    }

    const { files } = req;
    if (!files.length) {
      return res.status(400).json({ error: 'O anúncio deve ter ao menos uma foto.' });
    }

    const images = [];
    const announcement = await Announcement.create(req.body);
    if (files && files.length) {
      await asyncForEach(files, async (file) => {
        const photo = await AdPhoto.create({
          url: file.filename,
          announcementId: announcement.id,
        });
        images.push(photo);
      });
    }

    return res.json({
      announcement,
      images,
    });
  }
}

export default new AnnouncementController();
