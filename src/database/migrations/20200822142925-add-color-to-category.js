module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('category', 'color', {
    type: Sequelize.STRING,
    allowNull: false,
  }),

  down: async (queryInterface) => queryInterface.removeColumn('category', 'color'),
};
