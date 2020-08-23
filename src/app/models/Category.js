import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init({
      description: Sequelize.STRING,
      color: Sequelize.STRING,
    }, {
      sequelize,
      tableName: 'category',
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Job, { foreignKey: 'categoryId', as: 'jobs' });
  }
}

export default Category;
