Template.roomLigneSelect.helpers({
     displayedLignes: function (school) {
          var result = new Array();

          var nbLigne = 1;
          for(var i=0; i<school.rooms.length; i++){
               if(school.rooms[i].nom === school.selectedRoom){
                    nbLigne = school.rooms[i].taille.lignes;
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
     }
});

Template.roomPage.events({
     "change #lignes" : function(e){
          e.defaultPrevented;
          var nomSalle = $("#roomActive").text();
          var nbRow = $("#lignes option:selected").val();
          var nbCol = $("#colonnes option:selected").val();
          updateRowRoomAndSeat(this.school, nomSalle, nbRow, nbCol);
          return false;
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