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
		{path: '/supprimerRoom/:_id',
		data: function() { return Schools.findOne(this.params._id); }});

});

