'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.belongsToMany(models.user, {through: models.usersFriends, as: 'user', foreignKey: 'userId'});
        models.user.belongsToMany(models.user, {through: models.usersFriends, as: 'friend', foreignKey: 'friendId'})
      }
    }
  });
  return user;
};