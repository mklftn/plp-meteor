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

     	for(var i=0; i<this.students.length; i++) {
     		if( $.inArray(this.selectedGroup, this.students[i].groups) != -1){
     			result.push(this.students[i]);
     		}
     	}

     	return result;

     }
});

Template.studentPage.events({
	"click .group-name" : function(e) {
		Meteor.call("updateSelectedGroup", this.idSchool, this.groupName);
	}
});


Template.groupCreation.events = {
 	"submit form": function(e) {

    		e.preventDefault();

    		var nomClasse = $(e.target).find('[name=nomClasse]').val();
      			
    		Schools.update({"_id" : this._id}, { "$addToSet": { "groups" : nomClasse } } );

    		Meteor.call("updateSelectedGroup", this._id, nomClasse);

  		}
};


Template.studentCreation.events = {
 	"submit form": function(e) {

    		e.preventDefault();

    		var nom = $(e.target).find('[name=nom]').val();
    		var prenom = $(e.target).find('[name=prenom]').val();
      			
    		Schools.update({"_id" : this._id}, { "$addToSet": { "students" : {"nom" : nom, "prenom" : prenom, "groups" : [this.selectedGroup]} } } );

  		}
};