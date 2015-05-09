Router.route("/", function(){
  this.render("messages");
});

Template.messages.onRendered(function(){
  $('ul.tabs').tabs();
});

Template.messages.events({
  "click .addFriend": function(){
    $('#addFriendModal').openModal();
  }
});
