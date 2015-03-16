Meteor.methods({
  createCurrentData: function(user, nomSchool){
       // Make sure the user is logged in before inserting a task
       if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      return CurrentData.insert({"user" : user, "school" : nomSchool}); 
    }
});