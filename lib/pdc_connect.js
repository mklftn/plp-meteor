Meteor.methods({
	testApi: function (message) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
    	throw new Meteor.Error("not-authorized");
    }
    var outputMessage= {"testMessage": message};
    var response = HTTP.call("POST","http://localhost:8080/test", {data:outputMessage,headers:{'Content-Type': 'application/json'}});
    console.log(response);
    return response.data.testMessage;
}
});