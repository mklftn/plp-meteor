Meteor.methods({

	createStudent : function (idSchool, group, nom, prenom) {

		 // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		Schools.update({"_id" : idSchool}, { "$addToSet": { "students" : {"nom" : nom, "prenom" : prenom, "groups" : [group]} } } );
	},
	modifyStudentName : function(idSchool, nom, prenom, nouveauNom, nouveauPrenom) {

		 // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		Schools.update({"_id" : idSchool, "students.nom" : nom, "students.prenom": prenom}, 
			{"$set" : {"students.$.nom" : nouveauNom, "students.$.prenom" : nouveauPrenom}});
	}

});