'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 99]
      }
    },
    avatar: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.belongsToMany(models.user, {through: models.usersFriends, as: 'user', foreignKey: 'userId'});
        models.user.belongsToMany(models.user, {through: models.usersFriends, as: 'friend', foreignKey: 'friendId'});
        models.user.belongsToMany(models.movie, {through: models.usersMovies})
        models.user.hasMany(models.provider);
      },
   
      authenticate: function(email, password, callback){
      this.find({where: {email: email}}).then(function(user){
        if (user) {
          bcrypt.compare(password, user.password, function(error, result){
            if (error) {
              callback(error);
            } else{
              callback(null, result ? user : false);
            }
          });
        } else {
          callback(null, false);
        }
      }).catch(callback);
    }
  },
    instanceMethods: {
      checkPassword: function(password, callback){
        if(password && this.password){
          bcrypt.compare(password, this.password, callback);
      } else {
        callback(null, false);
        }
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback){
        if(!user.password) return callback(null, user);
        bcrypt.hash(user.password, 10, function(err, hash){
          if (err) return callback(err);
          user.password = hash;
          callback(null, user);
        });
      }
    }
  });
  return user;
};

