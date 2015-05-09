Meteor.publish("friendsList", function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      friends: 1
    }
  });
});
Meteor.publish("userInfo", function(userId) {
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      emails: 1
    }
  });
});
Meteor.publish("chat", function(participant) {
  return Chat.find({
    participant: {
      $all: [this.userId, participant]
    }
  });
});
