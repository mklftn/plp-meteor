Meteor.methods({

	createStudent : function (idSchool, group, nom, prenom, genre) {

		 // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		Schools.update({"_id" : idSchool}, { "$addToSet": { "students" : {"nom" : nom, "prenom" : prenom, "genre": genre, "groups" : [group]} } } );
	},
	modifyStudentName : function(eleve, nouveauNom, nouveauPrenom, nouveauGenre) {

		 // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		Schools.update({"_id" : eleve.idSchool, "students.nom" : eleve.nom, "students.prenom": eleve.prenom}, 
			{"$set" : {"students.$.nom" : nouveauNom, "students.$.prenom" : nouveauPrenom, "students.$.genre" : nouveauGenre}});
	}

});