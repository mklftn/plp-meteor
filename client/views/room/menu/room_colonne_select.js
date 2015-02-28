Template.roomColonneSelect.helpers({
     displayedColonnes: function (school) {
          var result = new Array();

          var nbColonne = 1;
          for(var i=0; i<school.rooms.length; i++){
               if(school.rooms[i].nom === school.selectedRoom){
                    nbColonne = school.rooms[i].taille.colonnes;
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

Template.roomColonneSelect.events({
     "change #colonnes" : function(e){
          e.defaultPrevented;
          var nomSalle = $("#roomActive").text();
          var nbRow = $("#lignes option:selected").val();
          var nbCol = $("#colonnes option:selected").val();
          updateColRoomAndSeat(this.school, nomSalle, nbRow, nbCol);
          return false;
     }
});

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
}
