Events = new Mongo.Collection("events");
Boats = new Mongo.Collection("boats");
BoatTypes = new Mongo.Collection("boatTypes");
Groups = new Mongo.Collection("groups");
Trainings =  new Mongo.Collection("training");

var Schemas = {};

Schemas.Events = new SimpleSchema({
    dateStarted: {
        type: Date,
        label: "When has the session started",
        optional: true,
     //    autoform: {
	    //   type:"pickadate"
	    // }
    },
    dateEnded: {
        type: Date,
        label: "When has the session ended",
        optional: true,
     //    autoform: {
	    //   type:"pickadate"
	    // }
    },
    peopleIDs: {
        type: [String],
        optional: true,
        label: "Array containing people's IDs",
        autoform: {
        	type: "selectize",
        	afFieldInput: {multiple: true},
			options: function () {
				return Meteor.users.find().map(function (c) {
					return {label: c.profile.name, value: c._id};
				});
			}
		}
    },
    groupID: {
        type: [String],
        label: "ID of the training group",
        optional: true,
        autoform: {
        	type: "selectize",
        	afFieldInput: {multiple: true},
			options: function () {
				return Groups.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
    },
    boatID: {
        type: [String],
        optional: true,
        label: "ID of the boat",
        autoform: {
        	type: "selectize",
			afFieldInput: {multiple: true},
			options: function () {
				return Boats.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
    },
    distance: {
    	type: Number,
    	optional: true,
    	label: "Distance"
    },

    time: {
    	type: Number,
    	optional: true,
    	label: "Estimated duration in minutes"
    },
    
    comment: {
        type: String,
        label: "Comments",
        optional: true
    },
    training: {
    	type: [String],
    	label: "Plan of the training",
    	optional: true,
    	autoform: {
        	type: "selectize",
        	afFieldInput: {multiple: true},
			options: function () {
				return Trainings.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
    },

    state: {
    	type: String,
    	optional: true,
    	label: "State of the session",
    	autoform: {
    		type: "selectize",
    		options: function () {
    			return [
    				{label: 'Planned', value: 'planned'},
    				{label: 'Ongoing', value: 'ongoing'},
    				{label: 'Done', value: 'done'},
    				{label: 'Failed', value: 'failed'},
    			];
    		} 
    	}
    }
});
Events.attachSchema(Schemas.Events);


Schemas.Trainings = new SimpleSchema({
	name: {
		type: String,
		label: "Name of the training"
	},
	description: {
		type: String,
		label: "Description of the training"
	},
	plan: {
		type: [String],
		label: "Detailed plan of the training"
	}
});
Trainings.attachSchema(Schemas.Trainings);

Schemas.Boats = new SimpleSchema({
	name: {
		type: String,
		label: "Name of the boat"
	},
	type: {
		type: String,
		label: "Type of the boat",
		autoform: {
        	type: "selectize",
			options: function () {
				return BoatTypes.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
	},
	description: {
		type: String,
		label: "Description of the boat"
	}
});

Boats.attachSchema(Schemas.Boats);

Schemas.Groups = new SimpleSchema({
	name: {
		type: String,
		label: "Name of the group"
	},
	peopleIDs: {
		type: [String],
		label: "People in the group",
        autoform: {
        	type: "selectize",
			afFieldInput: {multiple: true},
			options: function () {
				return Meteor.users.find().map(function (c) {
					return {label: c.profile.name, value: c._id};
				});
			}
		}
	},
	description: {
		type: String,
		label: "Description of the group"
	}
});
Groups.attachSchema(Schemas.Groups);

Schemas.BoatTypes = new SimpleSchema({
	name: {
		type: String,
		label: "Name of the boat type, ex. Racing Quad / Novice Pair / Intermediate Single"
	},
	description: {
		type: String,
		label: "Description of the boat type"
	},
	// class: {
	// 	type: String,
	// 	label: "Description of the boat class, ex. Racing / Novice / Intermediate"
	// },
	capacity: {
		type: Number,
		label: "Capacity of the boat"
	}
});
BoatTypes.attachSchema(Schemas.BoatTypes);

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

BoatTypes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.users.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Groups.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Trainings.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
