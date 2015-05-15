Router.route("/", function() {
  this.render("messages");
});

Template.messagesTabs.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.messagesTabs.events({
  "click .addFriend": function() {
    $('#addFriendModal').openModal();
  }
});
