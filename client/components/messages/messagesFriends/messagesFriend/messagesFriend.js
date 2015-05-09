Template.messagesFriend.onCreated(function(){
  this.subscribe("userInfo", this.data);
});

Template.messagesFriend.helpers({
  "userInfos": function(){
    var user = Meteor.users.findOne({_id: this.valueOf()});
    if(user){
      return user.emails[0].address;
    }
    else{
      return "loading";
    }
  }
});

Template.messagesFriend.events({
  "click":function(e,t){
    e.preventDefault();
    Session.set("chatPartner", this.valueOf());
    Router.go("/chat/");
  }
});
