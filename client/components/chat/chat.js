Router.route("/chat/", function() {
  this.render("chat");
});

Session.set("chatId", undefined);
var doneLoading = new ReactiveVar(false);
Template.chat.onCreated(function() {
  Session.set("ChatIsOnChatPage", true);
  this.subscribe("chat", Session.get("chatPartner"));
  if (Session.get("chatPartner") === undefined) {
    Router.go("/");
    return false;
  }
  this.autorun(function() {
    if (doneLoading.get() !== true) {
      if (Template.instance().subscriptionsReady()) {
        var chat = Chat.findOne({
          participants: {
            $all: Session.get("chatPartner"),
            $size: Session.get("chatPartner").length
          }
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
    }
  });
});

Template.chat.onRendered(function() {
  $(".chat").css("margin", "0 0 70px");
});

Template.chat.onDestroyed(function() {
  Session.set("ChatIsOnChatPage", false);
  $(".chat").css("margin", "0px");
});

Template.chat.helpers({
  "message": function() {
    if (Session.get("chatId")) {
      var chat = Chat.findOne({
        _id: Session.get("chatId")
      }, {
        $sort: {
          index: -1
        }
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
  "click .sendMessageButton": function(e, t) {
    Template.chat.utils.sendMessage(e, t);
  },
  "keyup #sendMessageInput": function(e, t) {
    if (e.keyCode === 13) {
      Template.chat.utils.sendMessage(e, t);
    }
  }
});

Template.chat.utils = {
  "sendMessage": function() {
    if ($("#sendMessageInput").val().length <= 0) {
      return false;
    }
    var message = {};
    message.chatId = Session.get("chatId");
    message.text = $("#sendMessageInput").val();
    Meteor.call("sendMessage", message, function(error, result) {
      if (error) {}
      if (result) {
        $("#sendMessageInput").val("");
      }
    });
  }
};
