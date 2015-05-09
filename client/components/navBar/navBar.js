Template.navBar.onRendered(function() {
  $(".button-collapse").sideNav();
});

Template.navBar.events({
  "click a": function() {
    $('.button-collapse').sideNav('hide');
  },
  "click .accountsOpenModal": function(){
    $('#accountsModal').openModal();
  },
  "click .logout": function(){
    Meteor.logout(function(err){
      if(err){
        Materialize.toast(err.reason, 3000, "center-align red darken-3 white-text");
      }else{
        Materialize.toast("you are now Logged Out!", 3000, "green");
      }
    });
  }
});
