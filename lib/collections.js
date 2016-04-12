Events = new Mongo.Collection("events");
Boats = new Mongo.Collection("boats");
BoatTypes = new Mongo.Collection("boatTypes");
Groups = new Mongo.Collection("groups");

var Schemas = {};

Schemas.Events = new SimpleSchema({
    date: {
        type: Date,
        label: "Date",
        autoform: {
	      type:"pickadate"
	    }
    },
    peopleIDs: {
        type: [String],
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
        type: String,
        label: "ID of the training group",
        optional: true,
        autoform: {
        	type: "selectize",
			options: function () {
				return Groups.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
    },
    boatID: {
        type: String,
        label: "ID of the boat",
        autoform: {
        	type: "selectize",
			// afFieldInput: {multiple: true},
			options: function () {
				return Boats.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
    },
    distance: {
    	type: Number,
    	label: "Distance"
    },

    time: {
    	type: Number,
    	label: "Time in minutes"
    },
    
    comment: {
        type: String,
        label: "Comments",
        optional: true
    },
    plan: {
    	type: [String],
    	label: "Plan of the training",
    	optional: true
    }
});

Events.attachSchema(Schemas.Events);

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
