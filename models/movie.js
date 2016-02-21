'use strict';
module.exports = function(sequelize, DataTypes) {
  var movie = sequelize.define('movie', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN,
    current: DataTypes.BOOLEAN,
    guideboxId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return movie;
};