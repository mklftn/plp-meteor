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
               result.push({
                    nbColonnes : i,
                    selected : selection
               });
          }
          return result;
     }
});

Template.roomColonneSelect.events({
     "change #colonnes" : function(event){
      
          var nomSalle = this.school.selectedRoom;
          //TODO revoir cette partie: on ne doit pas recuperer le contenu de la page
          var nbRow = $("#lignes option:selected").val();
          var nbCol = event.target.value;;
          updateColRoomAndSeat(this.school, nomSalle, nbRow, nbCol);
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
