var db = require('./models');

// db.user.findOrCreate({
//   where: {name: 'Kristen'},
//   defaults: {
//   	email: 'ky@gmail.com',
//   	password: "password"
//   }
// }).spread(function(user, created) {
//     console.log(user);
//   });


// db.user.find({
//   where: {name: 'Rachel'},
// }).then(function(user) {
//   console.log(user);
// });


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
// add user 1 as a friend of 3
// db.user.findById(1).then(function(user) {
//   db.user.findById(3).then(function(friend) {
//   	user.addFriend(friend).then(function(){
//   		console.log('done');
//   	});
//   });
// });

// db.user.findById(2).then(function(user) {
//   db.user.findById(1).then(function(friend) {
//   		console.log(friend);
//   	});
//   });

// db.usersFriends.findAll({where: {friendId: 1}}).then(function(friends){
// 	console.log(friends);
// });







