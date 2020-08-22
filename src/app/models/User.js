import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        phoneNumber: Sequelize.STRING,
        job: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        coordX: Sequelize.STRING,
        coordY: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'user',
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Avatar, { foreignKey: 'avatarId', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
