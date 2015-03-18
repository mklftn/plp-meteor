Template.roomSelect.helpers({
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
     }
});

Template.roomSelect.events({
     "click .room-item" : function(e) {
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
     },
     "click #modifRoomName" : function(event, template) {
          template.find("#selectRoom").className = "hide";
          template.find("#changeNameRoom").className = "";
          template.find("#newName").focus();
     },
     "click #validNewRoomName" : function(event) {
          validerRoomName(this.school._id);
     },
     "keypress #newName" : function(event) {
          if(event.which == 13) {
               validerRoomName(this.school._id);
          }
}
});

//TODO - revoir cette methode
function validerRoomName(id){
          var oldName = $("#newName").attr('data-oldName');
          var newName = $("#newName").val();
          
          if(oldName != newName){
               Meteor.call("updateRoomName", id, oldName, newName, function(error, result){
               if(error){
                    throwError(error.reason);
               }
          });
               Meteor.call("updateSelectedRoom", id, newName);
          }
          $("#changeNameRoom").addClass("hide");
          $("#selectRoom").removeClass("hide");
}