Template.header.helpers({
     allSchools : function() {
     	return Schools.find({"_id" : {"$not" : this._id} });
     }
});