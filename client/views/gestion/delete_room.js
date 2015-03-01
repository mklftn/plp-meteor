Template.deleteRoom.helpers({
     displayedRooms: function (ecole) {
          var result = new Array();
          for(var i=0; i<ecole.rooms.length; i++){
               var item = {
                    roomName : ecole.rooms[i].nom,
                    idecole : ecole._id,
                    selected : ecole.rooms[i].nom === ecole.selectedRoom
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
          Meteor.call("updateSelectedRoom", this.idecole, this.roomName);
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
          var salleToSup = this.ecole.selectedRoom;
          var idecole = this.ecole._id;     
          if(this.ecole.rooms.length > 1){
               var newSelectedRoom = new String();
               if(this.ecole.rooms[0].nom != salleToSup){
                    newSelectedRoom = this.ecole.rooms[0].nom;
               } else {
                    newSelectedRoom = this.ecole.rooms[1].nom;
               }
               Meteor.call("updateSelectedRoom", idecole, newSelectedRoom);
          } else{
               Meteor.call("updateSelectedRoom", idecole, "");
          }
          Meteor.call("deleteRoom", idecole, salleToSup);
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