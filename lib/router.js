Router.configure({
	layoutTemplate: 'layout'
});


Router.map(function() {
	this.route('homePage', {path: '/'});

	this.route('accueil', 
		{path: '/etablissement/:_id',
		data: function() { return Schools.findOne(this.params._id); }});

	this.route('studentPage', 
		{path: '/classes/:_id',
		data: function() { return Schools.findOne(this.params._id); }});

	this.route('roomPage',
		{path: '/salles/:_id',
		data: function() { return Schools.findOne(this.params._id); }});

	this.route('deleteRoom',
		{path: '/supprimerRoom/:_id/:destination',
		data: function() {
		var ecoleCourante = Schools.findOne(this.params._id);
		var result = {
			ecole: ecoleCourante,
			redirect: this.params.destination,
			school: ecoleCourante.school
		}
		return result;
		}});

});

