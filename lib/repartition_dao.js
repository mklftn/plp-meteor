Meteor.methods({
  createRepartition: function (idSchool, repartitionName, roomName, groupName) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var nbRep = Schools.find({"_id" : idSchool, "repartitions": { "$elemMatch": { "room": roomName, "group": groupName } } } ).count();
    //S'il n'y a pas de répartition existante pour ce roomName et ce groupName
    if(nbRep === 0){
      Schools.update({"_id" : idSchool}, { "$addToSet": { "repartitions" : {"nomRepartitions" : [repartitionName], "room" : roomName, "group" : groupName } }} );
    } else {
      //Sinon on pushe le nom de la nouvelle répartition
//  alert(idSchool+ " " + roomName + " " + groupName + " " + repartitionName);
      Schools.update({"_id" : idSchool, "repartitions": { "$elemMatch": { "room": roomName, "group": groupName } }}, { "$push" : { "repartitions.$.nomRepartitions" : repartitionName } } );   
    }
  }
});
