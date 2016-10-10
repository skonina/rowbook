Template.userImport.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.userImport.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.userImport.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            // template.uploading.set( false );
            // Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        	template.uploading.set( false );
        	Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
        });
      }
    });
  }
});


Template.eventsListAdmin.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([0,10]);
  self.autorun(function(){
    self.subscribe('events', self.opt.get()[0], self.opt.get()[1]);
  });
});

Template.eventsListAdmin.events({

  'click .events-prev': function(event, template){
    
    var opt = template.opt.get();
  
    if(opt[0]!= 0){
      opt[0] -=10;
      // opt[1] -=10;
    
      template.opt.set(opt);
      console.log(template.opt.get());
    };
  },
  'click .events-next': function(event, template){
    if(Events.find().fetch().length == 10){
      var opt = template.opt.get();
      opt[0] +=10;
      // opt[1] +=10;
      
      template.opt.set(opt);
      console.log(template.opt.get());
    };
  },
});

Schema = {};

Schema.sendMessage = new SimpleSchema({
   message: {
      type: String,
      label: "New message",
      optional: true
   },
});

Template.sendMessage.helpers({
  messageSchema: function() {
    return Schema.sendMessage;
  }
});

// Template.sendMessage.events({
//   'submit .newMessage'(event) {
//       event.preventDefault();
     
//         // Get value from form element
//         // const target = event.target;
//         // const text = target.text.value;

//         console.log(event.target);
//         console.log(event.target.text);
//         console.log(event.target);
        


//         // Meteor.call('')
     
//         // // Insert a task into the collection
//         // Tasks.insert({
//         //   text,
//         //   createdAt: new Date(), // current time
//         // });

//         // Clear form
  
//     }
// });