'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Story, {foreignKey: 'userId'}),
    User.hasMany(models.Like, {foreignKey: 'userId'}),
    User.hasMany(models.Comment, {foreignKey: 'userId'}),
    User.belongsToMany(models.User, {through: models.Follower, as: 'followedUser', foreignKey: 'userId'}),
    User.belongsToMany(models.User, {through: models.Follower, as: 'follower', foreignKey: 'followerId'})
  };
  return User;
};
