Template.addFriendModal.events({
  "click .addFriendButton": function(e,t){
    e.preventDefault();
    var email = $("#friendEmail").val();
    if (Template.accounts.utils.validateEmail(email) === false) {
      $("#email").addClass("invalid");
      $("#email").focus();
      Materialize.toast("Invalid Email !", 3000, "center-align red darken-3 white-text");
      return false;
    }
    Meteor.call("addFriend", email, function(error){
      if(error){
        Materialize.toast(error.reason, 3000, "center-align red darken-3 white-text");
      }else{
        Materialize.toast("we added " + $("#friendEmail").val() + " to your Friends List!", 3000, "center-align green white-text");
        $('#addFriendModal').closeModal();
      }
    });
  }
});
