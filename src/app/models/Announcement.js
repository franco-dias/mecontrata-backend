import Sequelize, { Model } from 'sequelize';

class Announcement extends Model {
  static init(sequelize) {
    super.init({
      description: Sequelize.STRING,
    }, {
      sequelize,
      tableName: 'announcement',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default Announcement;
