Template.roomSelect.helpers({
     displayedRooms: function () {
          var result = new Array();
          for(var i=0; i<this.rooms.length; i++){
               var item = {
                    roomName : this.rooms[i].nom,
                    idSchool : this._id,
                    selected : this.rooms[i].nom === this.selectedRoom
               }
               result.push(item);
          }    
          return result;
     }
});

Template.roomSelect.events({
     "click .room-item" : function(e) {
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
     }
});