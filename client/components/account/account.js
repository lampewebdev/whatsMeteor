Session.set("accountModalShowLogin", true);

Template.accounts.helpers({
  "showLogin": function() {
    return Session.get("accountModalShowLogin");
  }
});

Template.accounts.events({
  "click .registerButton": function(e, t) {
    e.preventDefault();
    if (Session.get("accountModalShowLogin") === true) {
      Session.set("accountModalShowLogin", false);
      $(".loginButton").removeClass("teal");
      $(".loginButton").removeClass("white-text");
      $(".registerButton").addClass("teal");
      $(".registerButton").addClass("white-text");
    } else {
      if ($("#password").val() === "") {
        $("#password").addClass("invalid");
        $("#password").focus();
        Materialize.toast("You have to enter a Password", 3000, "center-align red darken-3 white-text");
        return false;
      }
      if (Template.accounts.utils.validateEmail($("#email").val()) === false) {
        $("#email").addClass("invalid");
        $("#email").focus();
        Materialize.toast("Invalid Email !", 3000, "center-align red darken-3 white-text");
        return false;
      }
      if ($("#confirmPassword").val() !== $("#password").val()) {
        $("#password").addClass("invalid");
        $("#confirmPassword").addClass("invalid");
        $("#password").focus();
        Materialize.toast("Passwords are different", 3000, "center-align red darken-3 white-text");
        return false;
      }
      var userData = {};
      userData.email = $("#email").val();
      userData.password = $("#password").val();
      Template.accounts.utils.registerUser(userData);
    }
  },
  "click .loginButton": function(e, t) {
    if (Session.get("accountModalShowLogin") === true) {
      var email = $("#emailLogin");
      var password = $("#passwordLogin");
      Template.accounts.utils.doLogin(email, password, t);
    } else {
      Session.set("accountModalShowLogin", true);
      $(".registerButton").removeClass("teal");
      $(".registerButton").removeClass("white-text");
      $(".loginButton").addClass("white-text");
      $(".loginButton").addClass("teal");
    }
  }
});

Template.accounts.utils = {
  doLogin: function(email, password, target) {
    Meteor.loginWithPassword(email.val(), password.val(), function(error) {
      if (error) {
        Materialize.toast("Email or Password is Wrong.", 3000, "red");
        return false;
      } else {
        $('#accountsModal').closeModal();
        Materialize.toast("Sie sind nun eingeloegt!", 3000, "green");
        $("#emailLogin").val("");
        $("#passwordLogin").val("");
      }
    });
  },
  registerUser: function(userData) {
    Accounts.createUser({
      email: userData.email,
      password: userData.password,
      friends: []
    }, function(err) {
      if (err) {
        Materialize.toast(err.reason, 3000, "center-align red darken-3 white-text");
        if (err.error === 403) {
          $("#email").addClass("invalid");
          $("#email").focus();
        }
      } else {
        Materialize.toast("Danke für Ihre Registrierung!", 3000);
        $("#email").addClass("invalid");
        $("#email").val("");
        $("#password").val("");
        $('#accountsModal').closeModal();
      }
    });
  },
  validateEmail: function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
};
