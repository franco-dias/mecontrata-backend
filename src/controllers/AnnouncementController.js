import Announcement from '../app/models/Announcement';
import AdPhoto from '../app/models/AdPhoto';

import asyncForEach from '../utils/asyncForEach';

class AnnouncementController {
  async index() {

  }

  async list() {

  }

  async store(req, res) {
    const { userId } = req;
    req.body.userId = userId;
    const announcement = await Announcement.create(req.body);
    announcement.photos = [];
    const { files } = req;
    if (files && files.length) {
      await asyncForEach(files, async (file) => {
        const photo = await AdPhoto.create({
          url: file.filename,
          announcementId: announcement.id,
        });
        announcement.photos.push({
          id: photo.id,
          url: photo.url,
        });
      });
    }

    return res.json(announcement);
  }

  async update() {

  }

  async delete() {

  }
}

export default new AnnouncementController();
