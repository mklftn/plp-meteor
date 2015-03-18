Template.roomVision.events({
     // Modifie suite a un click le statut seatactivity d'une place : active or inactive  
     "click .cel" : function(event) {

       var idSchool = this.id;
       var nomSalle = this.selectedRoom;
       var seatPosition = event.target.getAttribute("data-numeroplace");
       if(event.target.getAttribute("data-seatactivity") == "active"){
           Meteor.call("supprimerSeat", idSchool, nomSalle, seatPosition);
       } else{
          Meteor.call("ajouterSeat", idSchool, nomSalle, seatPosition);
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
                    var seatActivity;
                    var mess;
                    if(jQuery.inArray(place, positions)!==-1){
                         seatAct = "active";
                    } else{
                         seatAct = "inactive";
                    }

                    intColonnes.push({
                         colonne: k,
                         seat: place,
                         seatActivity: seatAct,
                         id: id,
                         selectedRoom: selectedR

                    });
               } 

               intLignes.push({
                    ligne: j,
                    colonnes: intColonnes
               });
          }

          //Objet renvoyé
          return {
               lignes: intLignes,
               nbTd: nbColonne,
               bigTitle: titre(nbColonne)
          }
     }
});

function titre(nbColonne){    
          return nbColonne > 4;
}