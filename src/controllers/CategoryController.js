import Category from '../app/models/Category';

class CategoryController {
  async index() {

  }

  async list() {

  }

  async store(req, res) {
    const category = await Category.create(req.body);
    return res.json(category);
  }

  async update() {

  }

  async delete() {

  }
}

export default new CategoryController();
