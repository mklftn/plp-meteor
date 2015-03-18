Template.roomCreation.events = {
	"submit form": function(event) {

		event.defaultPrevented;
		var idSchool = this._id;
		var nomSalle = event.target.nomSalle.value;
		var nbRow = 5;
		var nbCol = 6;
		Meteor.call("createRoom", idSchool, nomSalle, nbRow, nbCol, function(error, result){
			if(error){
				throwError(error.reason);
			}
		});
		Meteor.call("createDefaultSeats", idSchool, nomSalle, nbRow, nbCol);
		Meteor.call("updateSelectedRoom", idSchool, nomSalle);
		//TODO - revoir ça 
		$('[data-toggle="dropdown"]').parent().removeClass('open');
		event.target.nomSalle.value = "";

		return false;
	}
}; 