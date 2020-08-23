module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('job', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      references: { model: 'category', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: async (queryInterface) => queryInterface.dropTable('job'),
};
