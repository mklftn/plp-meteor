Template.homePage.helpers({
     lastSchool: function () {
     	console.log("yeahh");
       return Schools.findOne();
     }
});