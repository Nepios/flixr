'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersMovies = sequelize.define('usersMovies', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    favorite: DataTypes.BOOLEAN,
    current: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersMovies;
};