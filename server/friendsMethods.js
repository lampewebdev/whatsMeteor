var Fiber = Npm.require('fibers');
var Future = Npm.require("fibers/future");

Meteor.methods({
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
    var user = Meteor.users.findOne({"_id": this.userId});
    if(user.emails[0].address === friendEmail){
      throw new Meteor.Error(500, "you cant add yourself!");
    }
    if(user.friends.indexOf(friendEmail) >= 0){
      throw new Meteor.Error(500, "You are allready Friends!");
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
  }
});
