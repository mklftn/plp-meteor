Template.repartitionCreation.events = {
	"submit form": function(event, template) {

		event.defaultPrevented;
		var school = this.school;
		var idSchool = school._id;
		var nomRepartition = event.target.nomRepartition.value;
		var nomRoom = school.selectedRoom;
		var nomGroup = school.selectedGroup;
		Meteor.call("createRepartition", 
			   this.school._id, 
			   event.target.nomRepartition.value, 
			   this.school.nomRoom, 
			   this.school.nomGroup, function(error, result){
								if(error){
									throwError(error.reason);
								}
		});
		//TODO - a revoir
		$('[data-toggle="dropdown"]').parent().removeClass('open');
		event.target.nomRepartition.value = "";

		return false;
	}
}; 