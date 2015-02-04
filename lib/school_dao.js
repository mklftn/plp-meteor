Meteor.methods({
  updateSelectedGroup: function (idSchool, groupName) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Schools.update({"_id" : idSchool}, { "$set" : { "selectedGroup" : groupName } } );
  },
  createGroup: function(idSchool, groupName) {

  	if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Schools.update({"_id" : idSchool}, { "$addToSet": { "groups" : groupName } } );

    Meteor.call("updateSelectedGroup", idSchool, groupName);

  }
});