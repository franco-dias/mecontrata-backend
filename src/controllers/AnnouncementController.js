import * as yup from 'yup';

import Announcement from '../app/models/Announcement';
import AdPhoto from '../app/models/AdPhoto';

import asyncForEach from '../utils/asyncForEach';
import Category from '../app/models/Category';
import User from '../app/models/User';
import Avatar from '../app/models/Avatar';
import Job from '../app/models/Job';

const validation = yup.object().shape({
  description: yup.string().required(),
  categoryId: yup.number().required(),
  jobId: yup.number().required(),
  price: yup.string(),
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
    model: Job,
    as: 'job',
    attributes: [
      'description',
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
    include: [
      {
        model: Avatar,
        as: 'avatar',
        attributes: [
          'url',
        ],
      },
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
    const data = JSON.parse(req.body.data);
    data.userId = userId;
    const { description, categoryId, jobId } = data;

    try {
      validation.validateSync({
        description,
        categoryId,
        jobId,
      }, { abortEarly: false });
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { files } = req;
    if (!files.length) {
      return res.status(400).json({ error: 'O anúncio deve ter ao menos uma foto.' });
    }

    const images = [];
    const announcement = await Announcement.create(data);
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

  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;

    const announcement = await Announcement.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!announcement) {
      return res.status(401).json({ error: 'O anúncio não existe ou não pertence a este usuário.' });
    }

    announcement.destroy();
    return res.status(200).json({ message: 'O anúncio foi encerrado com sucesso.' });
  }
}

export default new AnnouncementController();
