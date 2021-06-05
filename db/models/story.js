'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsTo(models.User, {foreignKey: 'userId'}),
    Story.hasMany(models.Comment, {foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true}),
    Story.hasMany(models.Like, {foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true})

  };
  return Story;
};
