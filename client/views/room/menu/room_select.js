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
          e.defaultPrevented;
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
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
          validerRoomName(this._id);
          return false;
     },
     "keypress #newName" : function(e) {
          e.defaultPrevented;
          if(e.which == 13) {
          validerRoomName(this._id);
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