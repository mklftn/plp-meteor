Template.pdcSelect.helpers({
 displayedRooms: function (school) {
  var result = new Array();
  for(var i=0; i<school.rooms.length; i++){ 
    result.push({
     roomName : school.rooms[i].nom,
     idSchool : school._id,
     selected : school.rooms[i].nom === school.selectedRoom
    });
  }    
  return result;
},
displayedGroups: function (school) {
  var result = new Array();
  for(var i=0; i<school.groups.length; i++){
   result.push({
     groupName : school.groups[i],
     idSchool : school._id,
     selected : school.groups[i].nom === school.selectedGroup
   });
 }  
 return result;
},
displayedRepartitions: function (school) {
  var result = new Array();
  for(var i=0; i<school.repartitions.length; i++){
    if(school.repartitions[i].room === school.selectedRoom && school.repartitions[i].group === school.selectedGroup){
     for(var j=0; j<school.repartitions[i].nomRepartitions.length; j++){
      result.push({
        repartitionName : school.repartitions[i].nomRepartitions[j],
        idSchool : school._id,
      });
    }
  }   
}
return result;
},
repartitionActive: function (school) {
  var repartition = Template.instance().repartitionSelected.get();
  var result;
  if(repartition){
    result = repartition;
  } else{
    result = TAPi18n.__("repartition");
  }
  return result;
}
});

Template.pdcSelect.created = function() {
  this.solutionsPdc = new ReactiveVar;
  this.repartitionSelected = new ReactiveVar;
};


Template.pdcSelect.events({
 "click .room-item" : function(e, template) {
  Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
  template.repartitionSelected.set("");
  //TODO - a revoir
  $('[data-toggle="dropdown"]').parent().removeClass('open');
},
"click .group-item" : function(e, template) {
  Meteor.call("updateSelectedGroup", this.idSchool, this.groupName);
  template.repartitionSelected.set("");
  //TODO - a revoir
  $('[data-toggle="dropdown"]').parent().removeClass('open');
},
"click .repartition-item" : function(e, template) {
  var school = template.data.school;
  template.repartitionSelected.set(this.repartitionName);
  //TODO - a revoir
  $('[data-toggle="dropdown"]').parent().removeClass('open');
},
"click #sendTestMessage" : function(e,template) {
  var message = "ça s'en va et ça revient !";
  Meteor.call('testApi', message, function (error, result) {
   if(error){
    throwError(error.reason);
  } else{
    alert(result);
  }
});
},
"click #sendPlp" :function(e,template) {

  var school = template.data.school;
  var positions;
  var students = new Array();
  for(var i=0; i<school.rooms.length; i++){
    if(school.rooms[i].nom === school.selectedRoom){
      positions = school.rooms[i].positions;
    }
  }

  for(var j=0; j<school.students.length; j++){
    if(jQuery.inArray(school.selectedGroup, school.students[j].groups)!==-1){
      students.push({
        lastname : school.students[j].nom,
        firstname : school.students[j].prenom,
        gender : school.students[j].genre,
      });
    }
  } 

  var pdcDonneesToApi ={
    groupStudent: {
        students : students
    },
    girlBoy: false,
    alignGirlBoy: false,
    positions: positions
  }

Meteor.call('pdcApi', pdcDonneesToApi, function (error, result) {
 if(error){
  throwError(error.reason);
} else{
  template.solutionsPdc.set(result);
  alert(result);
}
});
},
"click #testPlp" :function(e,template) {
  alert(template.repartitionSelected.get());
}
});




