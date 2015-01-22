Schools = new Meteor.Collection('school');

Schools.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
});