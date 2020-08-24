module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('announcement', 'jobId', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'job',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }),

  down: async (queryInterface) => queryInterface.removeColumn('announcement', 'jobId'),
};
