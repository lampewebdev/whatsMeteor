Router.route("/chat/", function() {
  this.render("chat");
});

Session.set("chatId", undefined);
var doneLoading = new ReactiveVar(false);
Template.chat.onCreated(function() {
  this.subscribe("chat", Session.get("chatPartner"));
  if (Session.get("chatPartner") === undefined) {
    Router.go("/");
    return false;
  }
  this.autorun(function() {
    if (Template.instance().subscriptionsReady()) {
      var chat = Chat.findOne({
        participants: Session.get("chatPartner")
      });
      if (chat === undefined) {
        Chat.insert({
          participants: Session.get("chatPartner"),
          messages: []
        });
      } else {
        Session.set("chatId", chat._id);
        doneLoading.set(true);
      }
    }
  });
});
Template.chat.helpers({
  "message": function() {
    if (Session.get("chatId")) {
      var chat = Chat.findOne({
        _id: Session.get("chatId")
      });
      if (chat) {
        return chat.messages;
      }
    }
  },
  "doneLoading": function() {
    return doneLoading.get();
  }
});
Template.chat.events({
  "click button": function(e, t) {
    Template.chat.utils.sendMessage(e, t);
  },
  "keyup #sendMessage": function(e, t) {
    if (e.keyCode === 13) {
      Template.chat.utils.sendMessage(e, t);
    }
  }
});
Template.chat.utils = {
  "sendMessage": function() {
    if ($("#sendMessage").val().length <= 0) {
      return false;
    }
    var message = {};
    message.chatId = Session.get("chatId");
    message.text = $("#sendMessage").val();
    Meteor.call("sendMessage", message, function(error, result) {
      if (error) {}
      if (result) {
        $("#sendMessage").val("");
      }
    });
  }
};
