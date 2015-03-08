Schools = new Meteor.Collection('school');

Schools.allow({
  insert: function(userId, doc) {
    // autoriser les insertions seulement si l'utilisateur est authentifié
    return !! userId;
  },
  update: function(userId, doc) { return !! userId; },
  remove: function(userId, doc) { return !! userId; }
});
