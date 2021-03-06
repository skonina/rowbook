Template.eventOngoing.events({
  "click .session-end": function(event) {
    text = 'trololo';
    // console.log(event);
    // console.log(Events.findOne(this._id));
    // console.log(event.target);
    
    setTimeout(function(){
        
        // var text = Events.findOne(this._id).diff;
        Bert.alert({
          // title: 'Bra jobbat!',
          message: 'Bra jobbat!',
          style:'growl-top-right',
          type: 'success', });
      },0);   
}
});
Template.eventPlanned.events({
  "click .session-start": function(event) {
  	// console.log(this);
  	Meteor.call("sessionStart",this._id);
  }
});

Template.rowNow.events({
  "click .session-new": function(event) {
  	// console.log(this);
  	// Meteor.call("sessionStart",this._id);
  }
});

Template.eventOngoing.events({
  "click .damage": function(event) {
    var a = this;
    // console.log(this.name);
    // console.log(event);
    var doc = {}
    doc.message = (this.name + " got damaged: " + this.reports);
    Meteor.call("sendMessage", doc);
    Meteor.call("sendDamageEmail", a);
    Bert.alert('Reported!','success', 'growl-top-right');
    
    // console.log(doc.message);
    // Meteor.call("sessionStart",this._id);
  },

  "click .trainings":function(event) {
    $('.collapsible').collapsible();
  }
});


Template.ongoingSessions.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([0,100]);
  self.autorun(function(){
    self.subscribe('events', self.opt.get()[0], self.opt.get()[1], 'ongoing');
    $('.collapsible').collapsible();
  });
});

Template.plannedSessions.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([0,10]);
  self.autorun(function(){
    self.subscribe('events', self.opt.get()[0], self.opt.get()[1], 'planned');
  });
});

Template.doneSessions.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([0,10]);
  self.autorun(function(){
    self.subscribe('events', self.opt.get()[0], self.opt.get()[1], 'done');
  });
});

Template.doneSessions.events({

  'click .events-prev': function(event, template){
    var opt = template.opt.get();
  
    if(opt[0]!= 0){
      opt[0] -=10;
      // opt[1] -=10;
    
      template.opt.set(opt);
      // console.log(template.opt.get());
    };
  },
  'click .events-next': function(event, template){
    if(true){
      var opt = template.opt.get();
      opt[0] +=10;
      // opt[1] +=10;
      
      template.opt.set(opt);
      // console.log(template.opt.get());
    };
  },
  "click .trainings":function(event) {
    $('.collapsible').collapsible();
  }
  
});




Template.boathouseView.onCreated(function() {
  this.autorun(() => {
    this.subscribe('users');
    this.subscribe('groups');
    this.subscribe('boats');
    this.subscribe('boatTypes');
    this.subscribe('trainings');
    // this.subscribe('events');

  });
});
  

Template.boathouseView.onRendered(function(){
  this.autorun(() => {
      if (this.subscriptionsReady()) {
        Tracker.afterFlush(() => {
        $('.collapsible').collapsible();
        // console.log("Collapsible ON!");
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

// var hookFinish = {
//   newSession: {
//     after: function(error, result){
//       Meteor.call("sessionEnd",result);
//     }
//   }
// };

AutoForm.hooks({
  newMessage: {
    onSuccess:function(){
      Bert.alert('Users have been notificated!','success', 'growl-top-right');
    }
  },
  newSession: {
      before:{
        update: function(doc) {
          // console.log("LOOL");
          // console.log(doc);
          
          // var suburbString = AutoForm.getFieldValue("longsuburb");
          // var postcode = suburbString.substring(suburbString.lastIndexOf(",")+2,suburbString.length);
          // var suburb = suburbString.substring(0,suburbString.indexOf(","));
          // doc.$set.postcode = postcode;
          // doc.$set.suburb = suburb;
          return doc; //autoForm magic commence
          },
       insert: function(doc) {
          // var suburbString = AutoForm.getFieldValue("longsuburb");
          // var postcode = suburbString.substring(suburbString.lastIndexOf(",")+2,suburbString.length);
          // var suburb = suburbString.substring(0,suburbString.indexOf(","));
          // if(doc.state == "ongoing"){
          //   console.log(doc);
          //   Meteor.call("sessionEnd",doc);
          // }
          doc.state = 'ongoing';
          var d = new Date();
          doc.dateStarted = d;
          // doc.$set.suburb = suburb;
          return doc; //autoForm magic commence
          }
        },
        onSuccess: function(formType, result) {
	        $('#newSession select')[0].selectize.clear()
	        $('#newSession select')[1].selectize.clear()
	        $('#newSession select')[2].selectize.clear()
	        $('#newSession select')[3].selectize.clear()
          import { Random } from 'meteor/random';
          text = '<center><h5>'+ Random.choice(quotes) + '</h5></center>';
          // console.log(quotes[3]);
          // console.log(text);
          Bert.alert(text);
	    }
	},
  updateUsername: {
    onSuccess: function(formType, result) {
          // $('#updateUsername').clear();
          // $('#updateUsername select')[1].selectize.clear();
          // $('#updateUsername select')[2].selectize.clear();
          // $('#updateUsername select')[3].selectize.clear();
          
          Bert.alert('Updated!','success', 'growl-top-right');
    }
  }    
});



