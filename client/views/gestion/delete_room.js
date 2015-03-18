Template.deleteRoom.helpers({
     displayedRooms: function (ecole) {
          var result = new Array();
          for(var i=0; i<ecole.rooms.length; i++){
               result.push({
                    roomName : this.rooms[i].nom,
                    idSchool : this._id,
                    selected : this.rooms[i].nom === this.selectedRoom
               });
          }    
          return result;
     }
});

Template.deleteRoom.events({
     "click .room-item" : function(e) {
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);

          //TODO - revoir ça
          $('[data-toggle="dropdown"]').parent().removeClass('open');
     },
     "click #stopSupp" : function(e) {
          window.history.back();
     },
     "click #validSupp" : function(e) {
          var salleToSup = this.selectedRoom;
          var idSchool = this._id;  
          if(this.rooms.length > 1){
               var newSelectedRoom = new String();
               if(this.rooms[0].nom != salleToSup){
                    newSelectedRoom = this.rooms[0].nom;
               } else {
                    newSelectedRoom = this.rooms[1].nom;
               }
               Meteor.call("updateSelectedRoom", idSchool, newSelectedRoom);
          } else{
               Meteor.call("updateSelectedRoom", idSchool, "");
          }
          Meteor.call("deleteRoom", idSchool, salleToSup);
     }
});