
Template.roomPage.helpers({
     displayedRooms: function () {
          var result = new Array();
          for(var i=0; i<this.rooms.length; i++){
               var item = {
                    roomName : this.rooms[i].nom,
                    idSchool : this._id,
                    selected : this.rooms[i].nom === this.selectedRooms
               }
               result.push(item);
          }    
          return result;
     },
     displayedLignes: function () {
          var result = new Array();

          var nbLigne = 1;
           for(var i=0; i<this.rooms.length; i++){
               if(this.rooms[i].nom === this.selectedRoom){
                    nbLigne = this.rooms[i].taille.lignes;
               }
          }   

          for(var i=1; i<10; i++){
               var item = {
                    nbLignes : i,
                    selected : nbLigne === i 
               }
               result.push(item);
          }
          return result;
     },
     displayedColonnes: function () {
          var result = new Array();

          var nbColonne = 1;
           for(var i=0; i<this.rooms.length; i++){
               if(this.rooms[i].nom === this.selectedRoom){
                    nbColonne = this.rooms[i].taille.colonnes;
               }
          }    

          for(var i=1; i<10; i++){
               var item = {
                    nbColonnes : i,
                    selected : nbColonne === i
               }
               result.push(item);
          }
          return result;
     }
});

Template.roomPage.events({
     "click .room-item" : function(e) {
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
     },
     "change #lignes" : function(e){
          e.preventDefault();
          var nomSalle = $("#roomActive").text();
          var nbRow = $("#lignes option:selected").val();
          var idSchool = this._id;
          Session.set("roomRow", nbRow);
          Meteor.call("updateRowRoom", idSchool, nomSalle, nbRow);
     },
     "change #colonnes" : function(e){
          e.preventDefault();
          var nomSalle = $("#roomActive").text();
          var nbCol = $("#colonnes option:selected").val();
          var idSchool = this._id;
          Session.set("roomCol", nbCol);
          Meteor.call("updateColRoom", idSchool, nomSalle, nbCol);
     }
});
