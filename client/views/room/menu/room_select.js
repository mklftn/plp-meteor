Template.roomSelect.helpers({
     displayedRooms: function (school) {
          var result = new Array();
          for(var i=0; i<school.rooms.length; i++){
               var item = {
                    roomName : school.rooms[i].nom,
                    idSchool : school._id,
                    selected : school.rooms[i].nom === school.selectedRoom
               }
               result.push(item);
          }    
          return result;
     }
});

Template.roomSelect.events({
     "click .room-item" : function(e) {
          e.defaultPrevented;
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
          $('[data-toggle="dropdown"]').parent().removeClass('open');
          return false;
     },
     "click #modifRoomName" : function(e) {
          e.defaultPrevented;
          $("#selectRoom").addClass("hide");
          $("#changeNameRoom").removeClass("hide");
          $("#newName").focus();
          return false;
     },
     "click #validNewRoomName" : function(e) {
          e.defaultPrevented;
          validerRoomName(this.school._id);
          return false;
     },
     "keypress #newName" : function(e) {
          e.defaultPrevented;
          if(e.which == 13) {
          validerRoomName(this.school._id);
          return false;
  }
}
});

function validerRoomName(id){
          var oldName = $("#newName").attr('data-oldName');
          var newName = $("#newName").val();
          if(oldName != newName){
               Meteor.call("updateRoomName", id, oldName, newName);
               Meteor.call("updateSelectedRoom", id, newName);
          }
          $("#changeNameRoom").addClass("hide");
          $("#selectRoom").removeClass("hide");
}