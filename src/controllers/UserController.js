import * as yup from 'yup';
import User from '../app/models/User';
import Avatar from '../app/models/Avatar';

const validation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  phoneNumber: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  job: yup.string().required(),
});

class UserController {
  async store(req, res) {
    const data = JSON.parse(req.body.data);
    const { email } = data;
    const hasSameEmail = await User.findOne({
      where: { email },
    });
    if (hasSameEmail) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    try {
      validation.validateSync(data, { abortEarly: false });
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    if (req.file) {
      const { filename } = req.file;
      const avatar = await Avatar.create({
        url: filename,
      });
      data.avatarId = avatar.id;
    }
    const user = await User.create(data);
    return res.status(200).json(user);
  }
}

export default new UserController();
