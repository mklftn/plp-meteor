Meteor.publish('schools', function() {
  return Schools.find({"user" : this.userId});
});