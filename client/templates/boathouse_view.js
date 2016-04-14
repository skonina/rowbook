Template.eventOngoing.events({
  "click #session-end": function(event) {
  	// console.log(this);
  	Meteor.call("sessionEnd",this._id);
  }
});

Template.eventPlanned.events({
  "click #session-start": function(event) {
  	// console.log(this);
  	Meteor.call("sessionStart",this._id);
  }
});
