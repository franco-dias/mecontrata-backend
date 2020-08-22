module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('ad_photo', 'announcementId', {
    type: Sequelize.INTEGER,
    references: { model: 'announcement', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }),

  down: async (queryInterface) => queryInterface.removeColumn('ad_photo', 'announcementId'),
};
