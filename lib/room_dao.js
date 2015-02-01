Meteor.methods({
  createRoom: function (idSchool, roomName, nbRow, nbCol) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Schools.update({"_id" : idSchool}, { "$addToSet": { "rooms" : {"nom" : roomName, "taille" : {"lignes" : nbRow, "colonnes" : nbCol}}}} );
  },
  updateSelectedRoom: function (idSchool, roomName) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Schools.update({"_id" : idSchool}, { "$set" : { "selectedRoom" : roomName } } );
  },
  updateRowRoom: function (idSchool, roomName, nbRow) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Schools.update({"_id": idSchool, "rooms.nom": roomName },{ "$set" : { "rooms.$.taille.lignes" : nbRow } });
  },
  updateColRoom: function (idSchool, roomName, nbCol) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Schools.update({"_id": idSchool, "rooms.nom": roomName },{ "$set" : { "rooms.$.taille.colonnes" : nbCol } });
  },
  createDefaultSeats: function (idSchool, roomName, nbRow, nbCol) {
    var seatArray = createSeat(nbRow, nbCol);
    Schools.update({"_id": idSchool, "rooms.nom": roomName },{ "$set" : { "rooms.$.positions" : seatArray } });
    Session.set("positions", seatArray);
  },
  ajouterSeat: function(idSchool, roomName, seatPosition){
    var pos = parseInt(seatPosition,10);
    Schools.update({"_id": idSchool, "rooms.nom": roomName },{ "$push" : { "rooms.$.positions" : pos } });   
  },
  supprimerSeat: function(idSchool, roomName, seatPosition){
    var pos = parseInt(seatPosition,10);
    Schools.update({"_id": idSchool, "rooms.nom": roomName },{ "$pull" : { "rooms.$.positions" : pos } });   
  }
});

function createSeat (nbRow, nbCol) {
  var arraySeat = [];
  for (var i = 1; i <= nbRow; i++) {
    var ligne = i*10;
    for (var j = 1; j <= nbCol; j++) {
      var seat = ligne + j;
      arraySeat.push(seat);
    }}
    return arraySeat;
  };