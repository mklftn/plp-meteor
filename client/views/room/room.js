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
     }
});

Template.roomPage.events({
     "click .room-item" : function(e) {
          $('#nbLignes').text(this.nbLignes);
          Meteor.call("updateSelectedRoom", this.idSchool, this.roomName);
     },
     "click .nbRow" : function(e) {
          alert(this.nbLignes);
     }
});

Template.roomCreation.events = {
	"submit form": function(e) {

		e.preventDefault();

		var nomSalle = $(e.target).find('[name=nomSalle]').val();

		Schools.update({"_id" : this._id}, { "$addToSet": { "rooms" : {"nom" : nomSalle, "taille" : {"lignes" : 6, "colonnes" : 5}}}} );

	}
}; 