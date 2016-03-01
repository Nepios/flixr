$(document).ready(function () {
  // Plugin initialization
  $('.carousel').carousel();
  $(".button-collapse").sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
  // delete link for friends
  $('.delete-link').click(function(e){
    e.preventDefault();
    var myUrl = $(this).attr('href');
    $.ajax({
        url: myUrl,
        method:'DELETE'
    }).done(function(){
      window.location.href = '/friend';
    });
  });
});