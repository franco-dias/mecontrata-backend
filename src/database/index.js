import Sequelize from 'sequelize';

import config from '../config/database';
import User from '../app/models/User';
import Announcement from '../app/models/Announcement';
import Category from '../app/models/Category';
import Avatar from '../app/models/Avatar';
import AdPhoto from '../app/models/AdPhoto';
import Job from '../app/models/Job';

const models = [
  User,
  Announcement,
  Category,
  Job,
  Avatar,
  AdPhoto,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
