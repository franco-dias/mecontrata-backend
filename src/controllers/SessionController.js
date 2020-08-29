import jwt from 'jsonwebtoken';
import * as yup from 'yup';

import Avatar from '../app/models/Avatar';
import User from '../app/models/User';

const validation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

class UserController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      validation.validateSync({
        email,
        password,
      }, { abortEarly: false });
    } catch (e) {
      return res.status(400).json(e);
    }

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['url'],
        },
      ],
    });
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const checkPassword = await user.checkPassword(password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }
    const { id } = user;
    const token = jwt.sign({ id }, 'mecontratabackend');
    console.log(`user ${id} now has token ${token}`);
    delete user.password;
    return res.status(200).json({
      user,
      token,
    });
  }
}

export default new UserController();
