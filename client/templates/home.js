
AutoForm.setDefaultTemplate('materialize');
AccountsTemplates.addField({
        _id: 'name',
        type: 'text',
        required: true,
        displayName: 'Name & Surname',
    });

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
		this.subscribe('events');

	});
});
	

Template.adminView.onRendered(function(){
	this.autorun(() => {
	    if (this.subscriptionsReady()) {
	    	Tracker.afterFlush(() => {
				$('.collapsible').collapsible();
				console.log("Collapsible ON!");
			});
		}
	}); 
});

Template.userView.onCreated(function() {
	this.autorun(() => {
		this.subscribe('users');
		this.subscribe('groups');
		this.subscribe('boats');
		this.subscribe('boatTypes');
		this.subscribe('trainings');
		this.subscribe('events');

	});
});
	

Template.userView.onRendered(function(){
	this.autorun(() => {
	    if (this.subscriptionsReady()) {
	    	Tracker.afterFlush(() => {
				$('.collapsible').collapsible();
				console.log("Collapsible ON!");
			});
		}
	}); 
});

Template.boathouseView.onCreated(function() {
	this.autorun(() => {
		this.subscribe('users');
		this.subscribe('groups');
		this.subscribe('boats');
		this.subscribe('boatTypes');
		this.subscribe('trainings');
		this.subscribe('events');

	});
});
	

Template.boathouseView.onRendered(function(){
	this.autorun(() => {
	    if (this.subscriptionsReady()) {
	    	Tracker.afterFlush(() => {
				$('.collapsible').collapsible();
				console.log("Collapsible ON!");
			});
		}
	}); 
});

var hooksObject = {
	onSuccess: function(formType, result) {
        $('select')[0].selectize.clear();
    }
};


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
    