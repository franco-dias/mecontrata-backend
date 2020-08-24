import Sequelize, { Model } from 'sequelize';

class Announcement extends Model {
  static init(sequelize) {
    super.init({
      description: Sequelize.STRING,
      price: Sequelize.STRING,
    }, {
      sequelize,
      tableName: 'announcement',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    this.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.hasMany(models.AdPhoto, { foreignKey: 'announcementId', as: 'photos' });
  }
}

export default Announcement;
