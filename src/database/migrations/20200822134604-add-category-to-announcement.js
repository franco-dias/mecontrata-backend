module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('announcement', 'categoryId', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'category',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }),

  down: async (queryInterface) => queryInterface.removeColumn('announcement', 'categoryId'),
};
