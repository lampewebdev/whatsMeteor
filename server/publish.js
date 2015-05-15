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
Meteor.publish("chatsList", function() {
  return Chat.find({
    participants: {
      $all: [this.userId]
    }
  });
});
Meteor.publish("chat", function(participants) {
  return Chat.find({
    "participants": {$all: participants, $size: 2}
  });
});
