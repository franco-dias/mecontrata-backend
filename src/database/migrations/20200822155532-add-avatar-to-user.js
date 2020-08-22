module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('user', 'avatarId', {
    type: Sequelize.INTEGER,
    references: { model: 'avatar', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }),

  down: async (queryInterface) => queryInterface.removeColumn('user', 'avatarId'),
};
