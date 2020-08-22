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
    // this.hasMany(models.Announcement, { as: 'announcements' });
  }
}

export default Category;
