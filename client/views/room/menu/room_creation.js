Template.roomCreation.events = {
	"submit form": function(e) {

		e.defaultPrevented;

		var idSchool = this._id;
		var nomSalle = $(e.target).find('[name=nomSalle]').val();
		var nbRow = 5;
		var nbCol = 6;

		Meteor.call("createRoom", idSchool, nomSalle, nbRow, nbCol);
		Meteor.call("createDefaultSeats", idSchool, nomSalle, nbRow, nbCol);
		Meteor.call("updateSelectedRoom", idSchool, nomSalle);

		return false;
	}
}; 