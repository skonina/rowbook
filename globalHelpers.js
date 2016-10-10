UI.registerHelper("isBoathouse", function () {
    return Meteor.user().profile.name == 'Boathouse Admin';
}),

UI.registerHelper("random", function () {
  import { Random } from 'meteor/random';
    return Random.secret(10);
  });


UI.registerHelper("notificationCount", function () {
    return Notifications.find({read: false}).count();
}),

UI.registerHelper("newNotification", function () {
    if(Notifications.find({read: false}).count())
      return '#303F9F';
    return 'grey';
}),

UI.registerHelper("allMessages", function () {
    return Notifications.find();
}),

UI.registerHelper("boats", function () {
    return Boats.find();
}),

UI.registerHelper("boatTypes", function () {
    return BoatTypes.find();
}),

UI.registerHelper("groups", function () {
    return Groups.find();
}),

UI.registerHelper("eventsAdmin", function () {
    return Events.find().fetch();
}),

UI.registerHelper("eventsUser", function () {
    // return Events.find({peopleIDs: Meteor.user()._id}).fetch();
    return Events.find();
}),

UI.registerHelper("eventsOngoing", function () {
    return Events.find({state: 'ongoing'}).fetch()
}),

UI.registerHelper("eventsPlanned", function () {
    return Events.find({state: 'planned'}).fetch()
}),

UI.registerHelper("eventsDone", function () {
    return Events.find({state: 'done'}).fetch()
}),

UI.registerHelper("peopleInGroup", function (a) {
    return Groups.findOne(a);
}),

UI.registerHelper("parseUser", function (userId){
  return Meteor.users.findOne(userId);
}),

UI.registerHelper("parseUserNames", function (userIDs){
  var q = [];

  // if(typeof userIDs != "undefined")
  //     q.push('Rowers: ');

  _.each(userIDs, function (a){
    q.push(" " + Meteor.users.findOne(a).profile.name);
  });
  return q;
}),

UI.registerHelper("parseBoatNames", function (boatIDs){
  var q = [];

  // if(typeof boatIDs != "undefined")
  //     q.push('Boat: ');
  
  _.each(boatIDs, function (a){
    q.push(" " + Boats.findOne(a).name);
  });
  return q;
}),

UI.registerHelper("boatsCondition", function (){
  return Boats.findOne(this.boatID[0]).reports;
  console.log("!!!");
  console.log(this);
  console.log(event);
}),
UI.registerHelper("boat", function (){
  return Boats.findOne(this.boatID[0]);
  console.log("!!!");
  console.log(this);
  console.log(event);
}),

UI.registerHelper("boats_trained", function (c){
  var a = [] ;
console.log('!');
  console.log(this);
  console.log(this.boatID);

  _.each(c, function(q){
    a.push(Boats.findOne(q));
    console.log(q);
    console.log(Boats.findOne());
  }); 
  console.log(a);
  return a;
  // return Boats.findOne(this.boatID[0]);
  console.log("!!!");
  console.log(this);
  console.log(event);
}),


UI.registerHelper("parseGroupName", function (groupIDs){
  var q = [];
  _.each(groupIDs, function (a){
    q.push(" " + Groups.findOne(a).name);
  });
  return q;
}),

UI.registerHelper("parseGroupUserNames", function (groupIDs){
  var q = [];
  _.each(groupIDs, function (a){
    _.each(Groups.findOne(a).peopleIDs, function (b){
      q.push(" " + Meteor.users.findOne(b).profile.name);
    });
  });
  return q;
}),

UI.registerHelper("parseTraining", function (trainingIDs){
  var q = [];
  // if(typeof groupIDs != "undefined")
  //     q.push('Group: ');

  _.each(trainingIDs, function (a){
    q.push(" " + Trainings.findOne(a).name);
  });
  return q;
}),

UI.registerHelper("parseTrainings", function (trainingIDs){
  // var q = [];
  // // if(typeof groupIDs != "undefined")
  // //     q.push('Group: ');

  // _.each(trainingIDs, function (a){
  //   q.push(Trainings.findOne(a));
  // });
  // return q
  return Trainings.find({_id: {$in: trainingIDs}});
}),





UI.registerHelper("FreeLimit", function() {
  return RegisterLimit.find().fetch()[0].free;
});

UI.registerHelper("PayableLimit", function() {
  return RegisterLimit.find().fetch()[0].payable;
});

UI.registerHelper("dayFormat", function(a) {
  return moment(a).format('dddd, MMMM Do');
});

UI.registerHelper("hourFormat", function(a) {
  return moment(a).format('HH:mm');
});


UI.registerHelper("chosenEvents", function() {
    console.log('chosenEvents ' +this);
    var q = [];
    _.each(this.events, function (a){
      q.push(EventList.findOne(a));
    });
    return q;
});

UI.registerHelper("registeredUsers", function() {
    // console.log('registeredUsers' + this);
    var q = [];
    _.each(this.users, function (a){
      q.push(Meteor.users.findOne(a));
    });
    return q;
});
  
  
UI.registerHelper("hasUserDecided",function () {
      return !Meteor.user().decided;
});

UI.registerHelper("hasPaid", function() {
  return this.paid;
});


UI.registerHelper("email", function () {
		if(typeof this.services.google != "undefined")
			return this.services.google.email;
		if(typeof this.services.facebook != "undefined")
			return this.services.facebook.email;
		return this.emails[0].address;
	}
);


// Accounts.onCreateUser(function(options, user) {
//   user.events = [];
//   return user;
// });