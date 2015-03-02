Template.school_creation.events = {
	"submit form": function(e) {
		e.defaultPrevented;

		var school = {
			user: Meteor.userId(),
			nomSchool: $(e.target).find('[name=nom]').val()
		}

		school._id = Schools.insert(school);
		var newpath = "/etablissement/" + school._id;
		$(e.target).find('[name=nom]').val("");
		Router.go(newpath);
		$('[data-toggle="dropdown"]').parent().removeClass('open');
		return false;
	}
};