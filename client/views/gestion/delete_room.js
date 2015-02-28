Template.deleteRoom.helpers({
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

Template.deleteRoom.events({
     "click .room-item" : function(e) {
          e.defaultPrevented;
          $("#button_delete").removeClass("hide");
          $("#confirmDeleteRoom").addClass("hide");
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
          $('[data-toggle="dropdown"]').parent().removeClass('open');
          return false;
     },
     "click #okSupp" : function(e) {
          e.defaultPrevented;
          $("#selectDeleteRoom").addClass("hide");
          $("#button_delete").addClass("hide");
          $("#confirmDeleteRoom").removeClass("hide");
          return false;
     },
     "click #validSupp" : function(e) {
          e.defaultPrevented;
          var salleToSup = this.school.selectedRoom;
          var idSchool = this.school._id;     
          if(this.school.rooms.length > 1){
               var newSelectedRoom = new String();
               if(this.school.rooms[0].nom != salleToSup){
                    newSelectedRoom = this.school.rooms[0].nom;
               } else {
                    newSelectedRoom = this.school.rooms[1].nom;
               }
               Meteor.call("updateSelectedRoom", idSchool, newSelectedRoom);
          } else{
               Meteor.call("updateSelectedRoom", idSchool, "");
          }
          Meteor.call("deleteRoom", idSchool, salleToSup);
          $("#selectDeleteRoom").removeClass("hide");
          $("#button_delete").removeClass("hide");
          $("#confirmDeleteRoom").addClass("hide");
          return false;
     },
     "click #stopValidSupp" : function(e) {
          e.defaultPrevented;
          $("#selectDeleteRoom").removeClass("hide");
          $("#button_delete").removeClass("hide");
          $("#confirmDeleteRoom").addClass("hide");
          return false;
     }
});