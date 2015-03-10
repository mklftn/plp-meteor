Template.pdcSelect.helpers({
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
     },
     displayedGroups: function (school) {
        var result = new Array();
        for(var i=0; i<school.groups.length; i++){
           var item={
             groupName : school.groups[i],
             idSchool : school._id,
             selected : school.groups[i].nom === school.selectedGroup
        }
        result.push(item);
   }       
   return result;
}
});

Template.pdcSelect.events({
     "click .room-item" : function(e) {
          e.defaultPrevented;
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
          $('[data-toggle="dropdown"]').parent().removeClass('open');
          return false;
     },
     "click .group-item" : function(e) {
          e.defaultPrevented;
          Meteor.call("updateSelectedGroup", this.idSchool, this.groupName);
          $('[data-toggle="dropdown"]').parent().removeClass('open');
          return false;
     },
     "click #sendTestMessage" : function(e) {
          e.defaultPrevented;
          var message = "ça s'en va et ça revient !";
          Meteor.call('testApi', message, function (error, result) {
               if(error){
                    throwError(error.reason);
               } else{
                    alert(result);
               }
          });
          return false;
     }
});

