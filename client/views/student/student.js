Template.studentPage.helpers({
 displayedGroups: function () {
  
  var result = new Array();

  for(var i=0; i<this.groups.length; i++){
   
    if(this.groups[i] != this.selectedGroup){
      result.push(
        {
          groupName : this.groups[i],
          idSchool : this._id
        });
    }
  }  	
  return result;

}, displayedStudents: function() {

  var result = new Array();
  var myindex = 0;

  for(var i=0; i<this.students.length; i++) {
   if( $.inArray(this.selectedGroup, this.students[i].groups) != -1){


    result.push(
      {
        nom: this.students[i].nom,
        prenom: this.students[i].prenom,
        genre: this.students[i].genre,
        idSchool: this._id,
        index: myindex++
      }

    );
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
  "submit form": function(event,template) {

    event.defaultPrevented;
    var nomClasse = event.target.nomClasse.value;

    Meteor.call("createGroup", this._id, nomClasse, function(error, result){
      if(error){
        throwError(error.reason);
      }
    });

    return false;

  }
};


Template.studentCreation.events = {
  "submit form": function(event) {

    event.defaultPrevented;

    var student = {
         nom : event.target.nom.value,
         prenom : event.target.prenom.value,
         genre : event.target.genre.value,
         groups: [this.selectedGroup]
    }
   
    
    Meteor.call("createStudent", this._id, student, function(error, result){
      if(error){
        throwError(error.reason);
      }
    });

    return false;
  }
};


Template.studentModification.events = {
  "submit form" : function(e) {

    e.defaultPrevented;

     var newDataStudent = {
         nom : event.target.nom.value,
         prenom : event.target.prenom.value,
         genre : event.target.genre.value
    }

    Meteor.call("modifyStudentName", this, newDataStudent, function(error, result){
      if(error){
        throwError(error.reason);
      }
    });

    $(".studentModification").addClass("hide");

    $("#iconModifStudent"+this.index).removeClass("hide");
    $("#iconCancelModifStudent"+this.index).addClass("hide")

    return false;
  }



}