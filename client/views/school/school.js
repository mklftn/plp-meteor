Meteor.subscribe("schools");

Template.schoolPage.helpers({
  schools: function() {
     return Schools.find();
  }
});