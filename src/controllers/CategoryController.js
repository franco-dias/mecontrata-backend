import * as yup from 'yup';
import Category from '../app/models/Category';

const validation = yup.object().shape({
  color: yup.string().required(),
  description: yup.string().required(),
});

class CategoryController {
  async list(req, res) {
    const categoryList = await Category.findAll({
      attributes: [
        'id',
        'color',
        'description',
      ],
    });
    return res.status(200).json(categoryList);
  }

  async store(req, res) {
    try {
      validation.validateSync(req.body, { abortEarly: false });
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const category = await Category.create(req.body);
    return res.json(category);
  }
}

export default new CategoryController();
