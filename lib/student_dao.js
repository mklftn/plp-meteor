Meteor.methods({

	createStudent : function (idSchool, student) {

		 // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		Schools.update({"_id" : idSchool}, { "$addToSet": { "students" : student } } );
	},
	modifyStudentName : function(eleve, newDataStudent) {

		 // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		Schools.update({"_id" : eleve.idSchool, "students.nom" : eleve.nom, "students.prenom": eleve.prenom}, 
			{"$set" : {"students.$.nom" : newDataStudent.nom, "students.$.prenom" : newDataStudent.prenom, "students.$.genre" : newDataStudent.genre}});
	}

});