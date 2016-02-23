'use strict';
module.exports = function(sequelize, DataTypes) {
  var movie = sequelize.define('movie', {
    title: DataTypes.STRING,
    guideboxId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.movie.belongsToMany(models.user, {through: "usersMovies"})
      }
    }
  });
  return movie;
};