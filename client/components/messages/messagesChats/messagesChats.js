Template.MessagesChats.onCreated(function(){
  this.subscribe("chatsList", Meteor.userId());
});
Template.MessagesChats.helpers({
  "chats": function(){
    if(Meteor.userId()){
      return Chat.find( { participant: { $in: [ Meteor.userId ] } } );
    }
  }
});
