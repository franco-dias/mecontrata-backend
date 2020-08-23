import Sequelize, { Model } from 'sequelize';

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'job',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId' });
  }
}

export default Job;
