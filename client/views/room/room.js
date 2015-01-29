Template.roomPage.rendered = function () {
     var nbRow = Session.get("roomRow");
     var nbCol = Session.get("roomCol");
     $('#lignes').val(nbRow);
     $('#colonnes').val(nbCol);
};

Template.roomPage.helpers({
     displayedRooms: function () {
          var result = new Array();
          for(var i=0; i<this.rooms.length; i++){
               var item = {
                    roomName : this.rooms[i].nom,
                    nbLignes : this.rooms[i].taille.lignes,
                    nbColonnes : this.rooms[i].taille.colonnes,
                    idSchool : this._id,
                    selected : this.rooms[i] === this.selectedRooms
               }
               result.push(item);
          }    
          return result;
     },
     displayedLignes: function () {
          var result = new Array();
          for(var i=1; i<10; i++){
               var item = {
                    nbLignes : i
               }
               result.push(item);
          }
          return result;
     },
     displayedColonnes: function () {
          var result = new Array();
          for(var i=1; i<10; i++){
               var item = {
                    nbColonnes : i
               }
               result.push(item);
          }
          return result;
     }
});

Template.roomPage.events({
     "click .room-item" : function(e) {
          $('#nbLignes').text(this.nbLignes);
          $('#lignes').val(this.nbLignes);
          $('#colonnes').val(this.nbColonnes);
          Session.set("roomName", this.roomName);
          Session.set("roomRow", this.nbLignes);
          Session.set("roomCol", this.nbColonnes);
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

Template.roomCreation.events = {
	"submit form": function(e) {

		e.preventDefault();

		var nomSalle = $(e.target).find('[name=nomSalle]').val();

          Schools.update({"_id" : this._id}, { "$addToSet": { "rooms" : {"nom" : nomSalle, "taille" : {"lignes" : 6, "colonnes" : 5}}}} );

     }
}; 