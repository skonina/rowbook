Meteor.publish('users', function() {
	return Meteor.users.find();
});

Meteor.publish('allNotifications', function() {
	return Notifications.find();
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

Meteor.publish('events', function(s, l, option) {
	
	if(option){
		console.log(option);
		if( (option !== 'ongoing') && (option !== 'planned') && (option !== 'done') ){
			return Events.find({peopleIDs: {$elemMatch:{$eq: option}}}, {sort: {dateEnded: -1}, skip: s, limit: l});
		}else{
			if(option == 'ongoing')
				return Events.find({state: {$eq: option}}, {sort: {dateStarted: 1}, skip: s, limit: l});
			if(option == 'done')
				return Events.find({state: {$eq: option}}, {sort: {dateEnded: -1}, skip: s, limit: l});
			if(option == 'planned')
				return Events.find({state: {$eq: option}}, {sort: {dateStarted: 1}, skip: s, limit: l});
			
				
		}

	}else
		return Events.find({}, {sort: {dateStarted: -1}, skip: s, limit: l});
});


// Notifications.new({ title: 'System message' });
// Meteor.publish('events', function(){
//   return EventList.find();
// })

// Meteor.publish('limit', function(){
//   return RegisterLimit.find();
// })
// 