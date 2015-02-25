Template.roomVision.events({
// Modifie suite a un click le statut seatactivity d'une place : active or inactive  
"click .cel" : function(e) {
     e.defaultPrevented;
     var idSchool = this._id;
     var nomSalle = this.selectedRoom;
     var seatPosition = $(e.target).attr("data-numeroplace");
     if($(e.target).attr("data-seatactivity") == "active"){
          Meteor.call("supprimerSeat", idSchool, nomSalle, seatPosition);
     } else{
          Meteor.call("ajouterSeat", idSchool, nomSalle, seatPosition);
          return false;
     };
}
});

Template.roomVision.helpers({
     roomView: function () {
          var nbColonne = 1;
          var nbLigne = 1;
          var position = new Array();
          var id = this._id;
          var selectedR = this.selectedRoom;

          // Récup du nb de lignes et de colonnes ainsi que des places occupées
          for(var i=0; i<this.rooms.length; i++){
               if(this.rooms[i].nom === this.selectedRoom){
                    nbColonne = this.rooms[i].taille.colonnes;
                    nbLigne = this.rooms[i].taille.lignes;
                    positions = this.rooms[i].positions;
               }
          }

          var intLignes = new Array();
          for(var i=0; i<nbLigne; i++){
               var j = nbLigne - i;
               var intColonnes = new Array();
               for(var k=0; k<nbColonne; k++){
                    var l = k +1;
                    var place = (j * 10) + l;
                    var seatActivity = new String();
                    var mess = new String();
                    if(jQuery.inArray(place, positions)!==-1){
                         seatAct = "active";
                    } else{
                         seatAct = "inactive";
                    }

                    var col = {
                         colonne: k,
                         seat: place,
                         seatActivity: seatAct,
                         _id: id,
                         selectedRoom: selectedR

                    }
                    intColonnes.push(col);
               }
               var lig = {
                    ligne: j,
                    colonnes: intColonnes
               }
               intLignes.push(lig);
          }

          //Objet renvoyé
          var roomInfo = {
               lignes: intLignes,
               nbTd: nbColonne,
               bigTitle: titre(nbColonne)
          }
          return roomInfo;
     }
});

function titre(nbColonne){
               var grandTitre = new Boolean();
          if(nbColonne > 4){
               grandTitre = true;
          } else{
               grandTitre = false;
          }
          return grandTitre;
}