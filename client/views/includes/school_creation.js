Template.school_creation.events = {
	"submit form": function(event) {
		event.defaultPrevented;

		Meteor.call("createSchool", Meteor.userId(), event.target.nom.value, function(error, result){
			if(error){
				throwError(error.reason);
			} else{
				Router.go('accueil',{"_id":result});
			}
			event.target.nom.value = "";
		
			//TODO - revoir ça
			$('[data-toggle="dropdown"]').parent().removeClass('open');
		});
		return false;
	}
};