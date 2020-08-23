module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('announcement', 'price', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: async (queryInterface) => queryInterface.removeColumn('announcement', 'price'),
};
