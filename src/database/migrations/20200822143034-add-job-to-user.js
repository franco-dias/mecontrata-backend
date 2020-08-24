module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('user', 'job', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: async (queryInterface) => queryInterface.removeColumn('user', 'job'),
};
