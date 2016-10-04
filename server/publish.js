Meteor.publish('users', function() {
	return Meteor.users.find();
});

Meteor.publish('boats', function() {
	return Boats.find();
});

Meteor.publish('boatTypes', function() {
	return BoatTypes.find();
});

Meteor.publish('groups', function() {
	return Groups.find();
});

Meteor.publish('trainings', function() {
	return Trainings.find();
});

Meteor.publish('events', function() {
	return Events.find();
});



// Meteor.publish('events', function(){
//   return EventList.find();
// })

// Meteor.publish('limit', function(){
//   return RegisterLimit.find();
// })