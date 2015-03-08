Template.roomCreation.events = {
	"submit form": function(e) {

		e.defaultPrevented;
		var idSchool = this._id;
		var nomSalle = $(e.target).find('[name=nomSalle]').val();
		var nbRow = 5;
		var nbCol = 6;
		Meteor.call("createRoom", idSchool, nomSalle, nbRow, nbCol, function(error, result){
			if(error){
				throwError(error.reason);
			}
		});
		Meteor.call("createDefaultSeats", idSchool, nomSalle, nbRow, nbCol);
		Meteor.call("updateSelectedRoom", idSchool, nomSalle);
		$('[data-toggle="dropdown"]').parent().removeClass('open');
		var nomSalle = $(e.target).find('[name=nomSalle]').val("");

		return false;
	}
}; 