'use strict';
module.exports = function(sequelize, DataTypes) {
  var show = sequelize.define('show', {
    title: DataTypes.STRING,
    guideboxId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.show.belongsToMany(models.user, {through: "usersShows"})
      }
    }
  });
  return show;
};