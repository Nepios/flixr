var db = require('./models');

// db.user.findOrCreate({
//   where: {name: 'Denise'},
//   defaults: {
//   	email: 'dkk@gmail.com',
//   	password: "password"
//   }
// }).spread(function(user, created) {
//     console.log(user);
//   });


db.user.find({
  where: {name: 'Rachel'},
}).then(function(user) {
  user.addFriend()


// db.movie.findOrCreate({
//   where: {title: 'Pitch Perfect'},
//   defaults: {
//   	userId: 1,
//   	favorite: true,
//   	current: true
//   }
// }).spread(function(user, created) {
//     console.log(user);
//   });


// db.movie.find({
//   where: {title: 'Pitch Perfect'},
// }).then(function(user) {
//   console.log(user.get());
// });

// db.movie.find({
//   where: {favorite: true},
// }).then(function(user) {
//   console.log(user.get());
// });










