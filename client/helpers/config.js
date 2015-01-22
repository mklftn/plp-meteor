//Internationalisation : français si en France, Anglais sinon
Meteor.startup(
	function chooseLanguage () {
		var language = window.navigator.userLanguage || window.navigator.language;
		if (language == 'fr') {
			accountsUIBootstrap3.setLanguage(language);
		} else{
			accountsUIBootstrap3.setLanguage('en');
		};

	}
	)


//Champs demandés lors de la création de compte
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});