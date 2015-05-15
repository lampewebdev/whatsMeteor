Template.MessagesChats.onCreated(function() {
  this.subscribe("chatsList");
});

Template.MessagesChats.helpers({
  "chats": function() {
    if (Meteor.userId()) {
      return Chat.find({
        participants: {
          $all: [Meteor.userId()]
        }
      });
    }
  }
});
