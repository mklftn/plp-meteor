Template.header.helpers({
     allSchools : function() {
     	return Schools.find({"_id" : {"$not" : this._id} });
     }
});

Template.home_page_currentUser.helpers({
     allSchools : function() {
      return Schools.find({"_id" : {"$not" : this._id} });
     }
});


Template.school_creation.events = {
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