Meteor.subscribe("schools");

 Template.createEtabForm.events = {
 	"submit form": function(e) {
    		e.preventDefault();

    		var school = {
      			user: Meteor.userId(),
      			school: $(e.target).find('[name=nom]').val()
    		}

    		school._id = Schools.insert(school);

    		$(".createEtab").addClass('hide');
    		$("#openCreateEtabForm").removeClass('hide');

    		Router.go('schoolPage', school);
  		}
};