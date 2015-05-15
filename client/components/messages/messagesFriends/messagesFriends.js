Template.messagesFriends.onCreated(function(){
  this.subscribe("friendsList", Meteor.userId());
});

Template.messagesFriends.helpers({
  "friends": function(){
    if(Meteor.user()){
      return Meteor.user().friends;
    }
  }
});
