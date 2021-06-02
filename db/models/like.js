'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    count: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.Story, {foreignKey: 'storyId'}),
    Like.belongsTo(models.Comment, {foreignKey: 'commentId'}),
    Like.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Like;
};
