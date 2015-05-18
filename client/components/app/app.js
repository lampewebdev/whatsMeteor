App = {};
App.utils = {
  "randomColor": function() {
    var colors = ["red", "blue", "deep-purple", "lime", "orange", "deep-orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};

Template.registerHelper("isLoggedIn", function() {
  if (Meteor.userId()) {
    return true;
  } else {
    return false;
  }
});

Array.prototype.equalsFreeOrder = function(array) {
  var isThisElemExist;
  if (!array) {
    return false;
  }
  if (this.length != array.length) {
    return false;
  }
  for (var i = 0; i < this.length; i++) {
    isThisElemExist = false;
    for (var k = 0; k < this.length; k++) {
      if (this[i] instanceof Array && array[k] instanceof Array) {
        if (this[i].equalsFreeOrder(array[k])) {
          isThisElemExist = true;
        }
      } else if (this[i] == array[k]) {
        isThisElemExist = true;
      }
    }
    if (!isThisElemExist) {
      return false;
    }
  }
  return true;
};
