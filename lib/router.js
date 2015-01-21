Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function() {
  this.route('homePage', {path: '/'});

  this.route('schoolPage', 
  	{path: '/etablissement/:_id',
     data: function() { return Schools.findOne(this.params._id); }});

});

