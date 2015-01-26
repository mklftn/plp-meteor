Template.roomCreation.events = {
	"submit form": function(e) {

		e.preventDefault();

		var nomSalle = $(e.target).find('[name=nomSalle]').val();

		Schools.update({"_id" : this._id}, { "$addToSet": { "classrooms" : {"nom" : nomSalle, "size" : {"width" : 6, "height" : 5}}}} );

	}
}; 