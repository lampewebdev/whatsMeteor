var Future = Npm.require("fibers/future");
Push.debug = true;
Meteor.methods({
  "sendMessage": function(message) {
    var fut = new Future();
    var chat = Chat.findOne({
      _id: message.chatId
    });
    if (chat.messages) {
      message.index = chat.messages.length;
    } else {
      message.index = 0;
    }
    Chat.update({
      "_id": message.chatId
    }, {
      $push: {
        messages: {
          "index": message.index,
          "sender": this.userId,
          "message": message.text,
          "readBy": [this.userId]
        }
      }
    }, function(error) {
      if (error) {
        fut.throw(error);
      } else {
        chat.participants.splice(chat.participants.indexOf(this.Meteor.userId()), 1);
        chat.participants.forEach(function(element) {
          Push.send({
            from: 'whatsMeteor',
            title: 'new Chat Message',
            text: 'World',
            query: {
              userId: element
            },
          });
        });
        fut.return(true);
      }
    });
    return fut.wait();
  },
  "setChatMessageAsRead": function(chatId, data) {
    var fut = new Future();
    Chat.update({
      _id: chatId,
      messages: {
        $elemMatch: {
          index: data.index
        }
      }
    }, {
      $push: {
        "messages.$.readBy": Meteor.userId()
      }
    }, function(err, num) {
      fut.return(true);
    });
    return fut.wait();
  },
  "addFriend": function(friendEmail) {
    var email = Meteor.users.findOne({
      emails: {
        $elemMatch: {
          address: friendEmail
        }
      }
    });
    if (email === undefined) {
      throw new Meteor.Error(500, "No such email");
    }
    var user = Meteor.users.findOne({
      "_id": this.userId
    });
    if (user.emails[0].address === friendEmail) {
      throw new Meteor.Error(500, "you cant add yourself!");
    }
    if (user.friends) {
      if (user.friends.indexOf(friendEmail) >= 0) {
        throw new Meteor.Error(500, "You are allready Friends!");
      }
    }

    var fut = new Future();
    Meteor.users.upsert({
      _id: this.userId
    }, {
      $addToSet: {
        friends: email._id
      }
    }, function(error) {
      if (error) {
        fut.throw(error);
      } else {
        fut.return(true);
      }
    });
    return fut.wait();
  },
  "addParticipant": function(data) {
    var email = Meteor.users.findOne({
      emails: {
        $elemMatch: {
          address: data.email
        }
      }
    });
    var chat = Chat.findOne({
      _id: data.chatId
    });
    if (email === undefined) {
      throw new Meteor.Error(500, "No such email");
    }
    var user = Meteor.users.findOne({
      "_id": this.userId
    });
    if (chat.participants.indexOf(email._id) > -1) {
      throw new Meteor.Error(500, "is allready in Chat");
    }
    if (user.emails[0].address === data.email) {
      throw new Meteor.Error(500, "you cant add yourself!");
    }
    var fut = new Future();
    Chat.update({
      "_id": data.chatId
    }, {
      $push: {
        participants: email._id
      }
    }, function(error) {
      if (error) {
        fut.throw(error);
      } else {
        fut.return(true);
      }
    });
    return fut.wait();
  }
});
