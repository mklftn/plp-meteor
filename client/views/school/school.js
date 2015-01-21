Meteor.subscribe("schools");


 Template.openCreateEtabPopin.events = {
        "click .open-modal" : function(e,t) {
        	e.preventDefault();
        	$("#createEtabPopin").modal("show");
        }
};


 Template.createEtabPopin.events = {
 	"submit form": function(e) {
    		e.preventDefault();

    		var school = {
      			user: Meteor.userId(),
      			school: $(e.target).find('[name=nom]').val()
    		}

    		school._id = Schools.insert(school);

    		console.log("school " + JSON.stringify(school));

    		Router.go('schoolPage', school);
  		}
};