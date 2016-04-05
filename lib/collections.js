Events = new Mongo.Collection("events");
Boats = new Mongo.Collection("boats");
Groups = new Mongo.Collection("groups");

var Schemas = {};

Schemas.Events = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },
    peopleIDs: {
        type: [String],
        label: "Array containing people's IDs",
        autoform: {
			options: function () {
				return Meteor.users.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
    },
    groupID: {
        type: String,
        label: "ID of the training group",
        optional: true,
        autoform: {
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
        optional: true,
        autoform: {
			options: function () {
				return Boats.find().map(function (c) {
					return {label: c.name, value: c._id};
				});
			}
		}
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
	capacity: {
		type: Number,
		label: "Capacity of the boat"
	},
	type: {
		type: String,
		label: "Type of the boat"
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
		label: "People in the group"
	},
	description: {
		type: String,
		label: "Description of the group"
	}
});

Groups.attachSchema(Schemas.Groups);



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
