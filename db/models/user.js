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
    const columnMappingOne = { // User -> User, through Follow as follower
      through: 'Follower',
      otherKey: 'userId',
      foreignKey: 'followerId',
      as: 'users'
    }
    const columnMappingTwo = { // User -> User, through Follow as following
      through: 'Follower',
      otherKey: 'followerId',
      foreignKey: 'userId',
      as: 'followers'
    }

    User.hasMany(models.Story, {foreignKey: 'userId'}),
    User.hasMany(models.Like, {foreignKey: 'userId'}),
    User.hasMany(models.Comment, {foreignKey: 'userId'}),
    User.belongsToMany(models.User, columnMappingOne);
    User.belongsToMany(models.User, columnMappingTwo);

  };
  return User;
};
