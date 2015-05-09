Template.chatMessage.onCreated(function() {
  this.subscribe("userInfo", this.data.sender);
  Meteor.users.findOne({
    _id: this.data.sender
  });
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
  }
});
