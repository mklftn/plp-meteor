Template.studentPage.helpers({
     displayedGroups: function () {
    
        var result = new Array();

     	for(var i=0; i<this.groups.length; i++){
     		
            if(this.groups[i] != this.selectedGroup){
                var item={
                    groupName : this.groups[i],
                    idSchool : this._id
                }

                result.push(item);
            }
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
                    genre: this.students[i].genre,
                    idSchool: this._id,
                    index: myindex++
                }

     			result.push(student);
     		}
     	}

     	return result;

     }
});

Template.studentModification.helpers({

    masculinChecked: function(){
        if(this && this.genre != "feminin"){
            return "checked";
        }else return "";
    },
    femininChecked: function(){
        if(this && this.genre == "feminin"){
            return "checked";
        } else return "";
    }

});

Template.studentPage.events({
	"click .group-name" : function(e) {
		Meteor.call("updateSelectedGroup", this.idSchool, this.groupName);
	}, 
    "click .openStudentModification" : function(e){

        $(".studentModification").addClass("hide");
        $(".openStudentModification").removeClass("hide");
        $(".closeStudentModification").addClass("hide");

        $("#iconModifStudent"+this.index).addClass("hide");
        $("#iconCancelModifStudent"+this.index).removeClass("hide");
        $("#studentModif"+this.index).removeClass("hide");
    },
    "click .closeStudentModification" : function(e){

        $("#iconModifStudent"+this.index).removeClass("hide");
        $("#iconCancelModifStudent"+this.index).addClass("hide");
        $("#studentModif"+this.index).addClass("hide");
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
            var genre = $(e.target).find('[name=genre]:checked').val();
      			
            Meteor.call("createStudent", this._id, this.selectedGroup, nom, prenom, genre);

            return false;
  		}
};


Template.studentModification.events = {
    "submit form" : function(e) {

        e.defaultPrevented;

        var nom = $(e.target).find('[name=nom]').val();
        var prenom = $(e.target).find('[name=prenom]').val();
        var genre = $(e.target).find('[name=genre]:checked').val();

        Meteor.call("modifyStudentName", this, nom, prenom, genre);

        $(".studentModification").addClass("hide");

        $("#iconModifStudent"+this.index).removeClass("hide");
        $("#iconCancelModifStudent"+this.index).addClass("hide")

        return false;
    }



}