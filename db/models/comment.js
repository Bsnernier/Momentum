'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Story, {foreignKey: 'storyId'}),
    Comment.hasMany(models.Like, {foreignKey: 'commentId'}),
    Comment.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Comment;
};
