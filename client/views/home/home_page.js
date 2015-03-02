Template.homePage.helpers({
	ecole: function () {
		var result = Schools.findOne();
		return result;
	}
});