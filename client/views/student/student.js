Template.studentPage.helpers({
     groups: function () {
       return this.groups;
     }
});


Template.groupCreation.events = {
 	"submit form": function(e) {

    		e.preventDefault();

    		var nomClasse = $(e.target).find('[name=nomClasse]').val();
      			
    		Schools.update({"_id" : this._id}, { "$addToSet": { "groups" : nomClasse } } );
  		}
};