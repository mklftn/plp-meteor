Template.school_creation.events = {
	"submit form": function(e) {
		e.defaultPrevented;
		var	user = Meteor.userId();
		var nomSchool = $(e.target).find('[name=nom]').val();


		Meteor.call("createSchool", user, nomSchool, function(error, result){
			if(error){
				throwError(error.reason);
			} else{
				Router.go('accueil',{"_id":result});
			}
			$(e.target).find('[name=nom]').val("");
			$('[data-toggle="dropdown"]').parent().removeClass('open');
		});
		return false;
	}
};