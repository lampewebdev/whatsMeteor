Template.registerModal.events({
  "keyup password, confirmPassword":function(){
    $("#password").removeClass("invalid");
    $("#confirmPassword").removeClass("invalid");
  }
});
