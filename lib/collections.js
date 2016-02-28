Events = new Mongo.Collection("events");
Boats = new Mongo.Collection("boats");


Events.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Boats.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.users.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
