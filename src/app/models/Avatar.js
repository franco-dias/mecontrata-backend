import Sequelize, { Model } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        url: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'avatar',
      },
    );
    return this;
  }
}

export default Avatar;
