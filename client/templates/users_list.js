Template.body.helpers({

    users: function () {
      return Meteor.users.find();
    },

    initCollapsible: function () {
    	$('.collapsible').collapsible();
    	console.log("Collapsible ON!");
    },
    
    hasUserDecided: function () {
      return !Meteor.user().decided;
    }
    
});

Template.days.rendered = function () {
	$('.collapsible').collapsible();
	console.log("LOOL");
};

Template.afterDecision.rendered = function () {
  $('.collapsible').collapsible();
};

Template.user_event.events({
	"click #user-event-remove": function(){
		// console.log(this);
		// console.log(Template.parentData(1));
		Meteor.call("userEventRemove",this._id, Template.parentData(1)._id);
	},

	"click #user-event-paid": function(){
		Meteor.call("userPay",this._id);
	},
});


Template.user.events({
	"click #user-remove": function () {
		Meteor.call("userRemove", this._id);
	},

	"click #user-admin":function () {
		Meteor.call("giveAdminPermission", this._id);
	}
})
