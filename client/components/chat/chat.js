Router.route("/chat/", function() {
  this.render("chat");
});

Template.chat.onCreated(function() {
  Session.set("chatPartner", "BB3wCYmpwDxujoeHs")
  this.subscribe("chat", Session.get("chatPartner"));
  Chat.findOne({
    participant: {
      $all: [Meteor.userId(), Session.get("chatPartner")]
    }
  });
});
Template.chat.helpers({
  "message": function() {
    if (Session.get("ChatId")) {
      var chat = Chat.findOne({
        _id: Session.get("ChatId")
      });
      if (chat) {
        return chat.messages;
      }
    }
  },
  "doneLoading": function() {
    var _id = Session.get("chatPartner");
    var chat = Chat.findOne({
      participant: {
        $all: [Meteor.userId(), _id]
      }
    });
    if (chat !== undefined) {
      Session.set("ChatId", chat._id);
      return true;
    } else {
      Chat.insert({
        participant: [Meteor.userId(), _id],
        messages: []
      }, function(error, _id) {
        Session.set("ChatId", _id);
        return true;
      });
    }
  }
});
