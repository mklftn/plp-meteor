Router.configure({
	layoutTemplate: 'layout'
});


Router.map(function() {
	this.route('index', {
		path: '/',
		onBeforeAction: function() {
			if (Meteor.user()) {
				Router.go('dashboard');
			}
		}
	});

	this.route('signin', {
		path: '/signin',
		layoutTemplate : 'layout_no_header'
	});

	this.route('accueil', 
		{path: '/etablissement/:_id',
		data: function() {
			return Schools.findOne(this.params._id) }});

	this.route('studentPage', 
		{path: '/classes/:_id',
		data: function() {
			return Schools.findOne(this.params._id) }});

	this.route('roomPage',
		{path: '/salles/:_id',
		data: function() {
			return Schools.findOne(this.params._id) }});

	this.route('deleteRoom',
		{path: '/supprimerRoom/:_id',
		data: function() {
			return Schools.findOne(this.params._id) }});

});

var accueil = function(pause) {
	if (!(Meteor.user() || Meteor.loggingIn())) {
		Router.go('signin');
	} else{
		var idSchool = Schools.findOne()._id;
		Router.go('accueil', {_id: idSchool});
	}
	pause();
};

var sign = function(pause) {
	if (!(Meteor.user() || Meteor.loggingIn())) {
		Router.go('signin');
	} else {
		this.next();
	}
};

var afterSign = function(pause) {
	if (Meteor.user()) {
		var idSchool = Schools.findOne()._id;
		Router.go('accueil', {_id: idSchool});
	}
}

Router.onBeforeAction(accueil, {only: ['index']});
Router.onBeforeAction(sign, {except: ['index','signin']});
Router.onAfterAction(afterSign, {only: ['signin']});