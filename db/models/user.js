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
    User.hasMany(models.Follower, {foreignKey: 'userId'}),
    User.belongsTo(models.Follower, {foreignKey: 'followerId'}),
    User.hasOne(models.Follower, {foreignKey: 'followerId'})
  };
  return User;
};
