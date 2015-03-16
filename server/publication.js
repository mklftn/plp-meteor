Meteor.publish('schools', function() {
  return Schools.find({"user" : this.userId});
});

Schools.allow({
    'update': function (userId,doc) {
      return doc.user === userId; 
    }
});

Meteor.publish('currentData', function() {
  return CurrentData.find({"user" : this.userId});
});

CurrentData.allow({
    'update': function (userId,doc) {
      return doc.user === userId; 
    }
});