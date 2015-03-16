Template.repartitionCreation.events = {
	"submit form": function(e, template) {

		e.defaultPrevented;
		var school = this.school;
		var idSchool = school._id;
		var nomRepartition = $(e.target).find('[name=nomRepartition]').val();
		var nomRoom = school.selectedRoom;
		var nomGroup = school.selectedGroup;
		Meteor.call("createRepartition", idSchool, nomRepartition, nomRoom, nomGroup, function(error, result){
			if(error){
				throwError(error.reason);
			}
		});
		$('[data-toggle="dropdown"]').parent().removeClass('open');
		var nomRepartition = $(e.target).find('[name=nomRepartition]').val("");

		return false;
	}
}; 