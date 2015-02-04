Template.studentPage.helpers({
     displayedGroups: function () {
     	var result = new Array();
     	for(var i=0; i<this.groups.length; i++){
     		var item = {
     			groupName : this.groups[i],
     			idSchool : this._id,
     			selected : this.groups[i] === this.selectedGroup
     		}

     		result.push(item);
     	}  	
       return result;
     }, displayedStudents: function() {

     	var result = new Array();
        var myindex = 0;

     	for(var i=0; i<this.students.length; i++) {
     		if( $.inArray(this.selectedGroup, this.students[i].groups) != -1){

                var student = {
                    nom: this.students[i].nom,
                    prenom: this.students[i].prenom,
                    idSchool: this._id,
                    index: myindex++
                }

     			result.push(student);
     		}
     	}

     	return result;

     }
});

Template.studentPage.events({
	"click .group-name" : function(e) {
		Meteor.call("updateSelectedGroup", this.idSchool, this.groupName);
	}, 
    "click .openStudentModification" : function(e){
        $(".studentModification").removeClass("hide");
    }
});


Template.groupCreation.events = {
 	"submit form": function(e) {

    		e.defaultPrevented;

    		var nomClasse = $(e.target).find('[name=nomClasse]').val();

            Meteor.call("createGroup", this._id, nomClasse);

            return false;

  		}
};


Template.studentCreation.events = {
 	"submit form": function(e) {

    		e.defaultPrevented;

    		var nom = $(e.target).find('[name=nom]').val();
    		var prenom = $(e.target).find('[name=prenom]').val();
      			
            Meteor.call("createStudent", this._id, this.selectedGroup, nom, prenom);

            return false;
  		}
};


Template.studentModification.events = {
    "submit form" : function(e) {

        e.defaultPrevented;

        var nom = $(e.target).find('[name=nom]').val();
        var prenom = $(e.target).find('[name=prenom]').val();

        Meteor.call("modifyStudentName", this.idSchool, this.nomEleve, this.prenomEleve, nom, prenom);

        $(".studentModification").addClass("hide");

        return false;
    }



}