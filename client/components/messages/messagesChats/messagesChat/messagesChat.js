Template.messagesChat.events({
  "click": function(e, t) {
    e.preventDefault();
    Session.set("chatPartner", this.participants);
    Router.go("/chat/");
  }
});

Template.messagesChatParticipant.onCreated(function() {
  this.subscribe("userInfo", this.data);
  Meteor.users.findOne({
    _id: this.data
  });
});

Template.messagesChatParticipant.helpers({
  "email": function() {
    if (Template.instance().subscriptionsReady()) {
      var that = this.valueOf();
      if (Meteor.userId() === that) {
        return false;
      }
      var user = Meteor.users.findOne({
        _id: that
      });
      return user.emails[0].address;
    } else {
      return "loading";
    }
  }
});
