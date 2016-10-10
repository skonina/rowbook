
// Schema = {};

Schemas.userUpdateSchema = new SimpleSchema({
   name: {
      type: String,
      label: "Your new username",
      optional: true
   },
   password: {
      type: String,
      label: "Your new password (you'll be logged out instantly)",
      optional: true
   },
   totalRowedDistance: {
		type: String,
		label: "Your new total rowed distance",
		optional: true
   }
});


Template.settingsUser.helpers({
  userUpdateSchema: function() {
    return Schemas.userUpdateSchema;
  }
});


Template.userView.onCreated(function() {
  this.autorun(() => {
    this.subscribe('users');
    this.subscribe('groups');
    this.subscribe('boats');
    this.subscribe('boatTypes');
    this.subscribe('trainings');
    this.subscribe('userNotifications', Meteor.user()._id)
    // this.subscribe('events');  
  });
});

Template.eventsListUser.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([0,5]);
  self.autorun(function(){
    self.subscribe('events', self.opt.get()[0], self.opt.get()[1], Meteor.user()._id,function(){});
  });
});

Template.eventsListUser.events({

  'click .events-prev': function(event, template){
    
    var opt = template.opt.get();
  
    if(opt[0]!= 0){
      opt[0] -=5;
      // opt[1] -=5;
    
      template.opt.set(opt);
      console.log(template.opt.get());
    };
  },
  'click .events-next': function(event, template){
    if(Events.find().fetch().length == 5){
      var opt = template.opt.get();
      opt[0] +=5;
      // opt[1] +=5;
      
      template.opt.set(opt);
      console.log(template.opt.get());
    };
  },
  
});
  

Template.userView.onRendered(function(){
  this.autorun(() => {
      if (this.subscriptionsReady()) {
        Tracker.afterFlush(() => {
        $('.collapsible').collapsible();
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
        console.log("Collapsible ON!");
      });
    }
  }); 
});