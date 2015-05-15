Template.chatMessage.onCreated(function() {
  this.subscribe("userInfo", this.data.sender);
  Meteor.users.findOne({
    _id: this.data.sender
  });
});

Template.chatMessage.onRendered(function() {
  if (this.data.readBy) {
    if (this.data.readBy.indexOf(Meteor.userId()) >= 0) {
      return false;
    }
  }
  Meteor.call("setChatMessageAsRead", Session.get("chatId"), this.data);
});

Template.chatMessage.helpers({
  email: function() {
    if (Template.instance().subscriptionsReady()) {
      var user = Meteor.users.findOne({
        _id: this.sender
      });
      if (user) {
        return user.emails[0].address;
      }
    }
  },
  isSender: function() {
    var user = Meteor.userId();
    if (user) {
      if (user === this.sender) {
        return true;
      } else {
        return false;
      }
    }
  },
  readByAll: function() {
    var chat = Chat.findOne({
      _id: Session.get("chatId")
    });
    return chat.participants.equalsFreeOrder(this.readBy);
  }
});
