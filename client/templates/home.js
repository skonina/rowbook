
// @import '_variables.scss';

AutoForm.setDefaultTemplate('materialize');
AccountsTemplates.addField({
        _id: 'name',
        type: 'text',
        required: true,
        displayName: 'Name & Surname',
    });
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      // minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

Template.usersList.helpers({
	users() {
		return Meteor.users.find();
	}
});
Template.group.helpers({
	convert (userId){
		return Meteor.users.findOne(userId);
	},
});
Template.trainingsList.helpers({
	trainings (){
		return Trainings.find();
	},
});
Template.boat.helpers({
	BoatType (a){
		// console.log(BoatTypes.findOne(this.type));
		return BoatTypes.findOne(this.type)[a];
	},
});

Template.adminView.onCreated(function() {
	this.autorun(() => {
		this.subscribe('users');
		this.subscribe('groups');
		this.subscribe('boats');
		this.subscribe('boatTypes');
		this.subscribe('trainings');
		this.subscribe('allNotifications');
		// this.subscribe('events');
	});
});
	

Template.adminView.onRendered(function(){
	this.autorun(() => {
	    if (this.subscriptionsReady()) {
	    	Tracker.afterFlush(() => {
				$('.collapsible').collapsible();
				console.log("Collapsible ON!");
				$('.dropdown-button').dropdown({
				     inDuration: 300,
				     outDuration: 225,
				     constrain_width: false, // Does not change width of dropdown to that of the activator
				     // hover: true, // Activate on hover
				     // gutter: 50, // Spacing from edge
				     belowOrigin: true, // Displays dropdown below the button
				     alignment: 'right' // Displays dropdown with edge aligned to the left of button
				   }
				 );
			});
		}
	}); 
});

Template.myNotificationsDropdown.replaces("notificationsDropdown");
Template.myNotificationsDropdown.events({
	'click .dropdown-button': function(event){
		console.log(event);
  }

});


// AccountsTemplates.addField({
//     _id: 'course',
//     type: "select",
//     required: true,
//     displayName: "Your new KTH department",
//     select: [
//         {
//         text: "Apple",
//         value: "aa",
//       }, {
//         text: "Banana",
//         value: "bb",
//       }, {
//         text: "Carrot",
//         value: "cc",
//       },
//     ],
// });


// Deps.autorun(function() {
//     Meteor.subscribe('users');
//     Meteor.subscribe('events');
//     Meteor.subscribe('limit');
    
// });




// UI.registerHelper("users", function () {
//   return Meteor.users.find();
// }),

// UI.registerHelper("initCollapsible", function () {
//     $('.collapsible').collapsible();
//     console.log("Collapsible ON!");
// }),

// UI.registerHelper("boats", function () {
//     return Boats.find();
// }),

// UI.registerHelper("groups", function () {
//     return Groups.find();
// }),

// UI.registerHelper("events", function () {
//     return Events.find();
// }),

// UI.registerHelper("peopleInGroup", function (a) {
//     return Groups.findOne(a).fetch();
// })
    