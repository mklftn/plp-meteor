Template.homePage.helpers({
     lastSchool: function () {
       return Schools.findOne();
     }, allSchools : function() {
     	return Schools.find();
     }
});