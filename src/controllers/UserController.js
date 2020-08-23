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
    console.log('entrei no store');
    const { email } = req.body;
    const hasSameEmail = await User.findOne({
      where: { email },
    });
    if (hasSameEmail) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    try {
      validation.validateSync(req.body, { abortEarly: false });
    } catch (e) {
      return res.status(400).json({ error: e.errors });
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
}

export default new UserController();
