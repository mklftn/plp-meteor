
Template.roomPage.helpers({
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
               var selection = (nbLigne == i ? 'selected' : '');
               var item = {
                    nbLignes : i,
                    selected : selection
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
               var selection = (nbColonne == i ? 'selected' : '');
               var item = {
                    nbColonnes : i,
                    selected : selection
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
          var nbCol = $("#colonnes option:selected").val();
          updateRowRoomAndSeat(this, nomSalle, nbRow, nbCol);
     },
     "change #colonnes" : function(e){
          e.preventDefault();
          var nomSalle = $("#roomActive").text();
          var nbRow = $("#lignes option:selected").val();
          var nbCol = $("#colonnes option:selected").val();
          updateColRoomAndSeat(this, nomSalle, nbRow, nbCol);
     }
});

function updateRowRoomAndSeat (school, nomSalle, nbRow, nbCol) {
         // On modifie le nombre de lignes en bdd
         Meteor.call("updateRowRoom", school._id, nomSalle, nbRow);
         // On récupère le nombre de lignes stocké en base pour supprimer ou ajouter les places nécessaires
         for(var i=0; i<school.rooms.length; i++){
          if(school.rooms[i].nom === nomSalle){
              nbLigne = school.rooms[i].taille.lignes;
           // Si le nombre de lignes en base est plus élevé, on supprime les places
           if (nbLigne > nbRow) {
               for(var j=nbLigne; j>nbRow; j--){
                    for (var k=0; k<nbCol; k++){
                         var seat = (parseInt(j,10)*10) + (parseInt(k,10) + 1);
                         Meteor.call('supprimerSeat', school._id, nomSalle, seat);
                    }
               }
          }
          // Si le nombre de lignes en base est plus faible, on ajoute les places
          if (nbLigne < nbRow) {
               for(var j=nbRow; j>nbLigne; j--){
                    for (var k=0; k<nbCol; k++){
                         var seat = (parseInt(j,10)*10) + (parseInt(k,10) + 1);
                         Meteor.call('ajouterSeat', school._id, nomSalle, seat);
                    }
               }
          }
     }
}
}

function updateColRoomAndSeat (school, nomSalle, nbRow, nbCol) {
         // On modifie le nombre de colonnes en bdd
         Meteor.call("updateColRoom", school._id, nomSalle, nbCol);
         // On récupère le nombre de colonnes stocké en base pour supprimer ou ajouter les places nécessaires
         for(var i=0; i<school.rooms.length; i++){
          if(school.rooms[i].nom === nomSalle){
              nbColonne = school.rooms[i].taille.colonnes;
           // Si le nombre de colonnes en base est plus élevé, on supprime les places
           if (nbColonne > nbCol) {
               for(var j=nbColonne; j>nbCol; j--){
                    for (var k=nbRow; k>0; k--){
                         var seat = (parseInt(k,10)*10) + parseInt(j,10);
                         Meteor.call('supprimerSeat', school._id, nomSalle, seat);
                    }
               }
          }
          // Si le nombre de colonnes en base est plus faible, on ajoute les places
          if (nbColonne < nbCol) {
               for(var j=nbCol; j>nbColonne; j--){
                    for (var k=nbRow; k>0; k--){
                         var seat = (parseInt(k,10) * 10) + parseInt(j,10);
                         Meteor.call('ajouterSeat', school._id, nomSalle, seat);
                    }
               }
          }
     }
}
alert(result);
}
