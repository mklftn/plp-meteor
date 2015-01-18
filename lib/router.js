Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function() {
  this.route('homePage', {path: '/'});
});

Router.map(function() {
  this.route('schoolPage', {path: '/etablissements'});
});