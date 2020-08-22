import * as yup from 'yup';
import User from '../app/models/User';
import Avatar from '../app/models/Avatar';

class UserController {
  async index() {

  }

  async list() {

  }

  async store(req, res) {
    const { email } = req.body;
    const hasSameEmail = await User.findOne({
      where: { email },
    });
    if (hasSameEmail) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }
    if (req.file) {
      const { filename } = req.file;
      const avatar = await Avatar.create({
        url: filename,
      });
      req.body.avatarId = avatar.id;
    }
    const user = await User.create(req.body);
    return res.status(200).json(user);
  }

  async update() {

  }

  async delete() {

  }
}

export default new UserController();
