Meteor.methods({
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
  }
});