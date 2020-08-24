import Category from '../app/models/Category';
import Job from '../app/models/Job';
import categories from '../mocks/occupations.json';

class CategoryController {
  async index(req, res) {
    const { id } = req.params;
    const categoryList = await Category.findByPk(id, {
      include: [
        {
          model: Job,
          as: 'jobs',
          attributes: [
            'id',
            'description',
          ],
        },
      ],
    });
    return res.status(200).json(categoryList);
  }

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
    categories.map(async (category) => {
      const { description, color, occupations } = category;
      const newCategory = await Category.create({
        description,
        color,
      });
      const { id } = newCategory;
      occupations.map(async (occupation) => {
        await Job.create({
          categoryId: id,
          description: occupation,
        });
      });
    });
    return res.json({ ok: true });
  }
}

export default new CategoryController();
