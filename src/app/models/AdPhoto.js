import Sequelize, { Model } from 'sequelize';

class AdPhoto extends Model {
  static init(sequelize) {
    super.init(
      {
        url: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'ad_photo',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Announcement, { foreignKey: 'announcementId', as: 'announcement' });
  }
}

export default AdPhoto;
