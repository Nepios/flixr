'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersShows = sequelize.define('usersShows', {
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER,
    favorite: DataTypes.BOOLEAN,
    current: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersShows;
};