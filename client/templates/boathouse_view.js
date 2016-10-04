Template.eventOngoing.events({
  "click .session-end": function(event) {
  	// console.log(this);
  	Meteor.call("sessionEnd",this._id);
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
  	console.log(this);
  	// Meteor.call("sessionStart",this._id);
  }
});

AutoForm.hooks({
  newSession: {
      before:{
        update: function(doc) {
          var suburbString = AutoForm.getFieldValue("longsuburb");
          var postcode = suburbString.substring(suburbString.lastIndexOf(",")+2,suburbString.length);
          var suburb = suburbString.substring(0,suburbString.indexOf(","));
          doc.$set.postcode = postcode;
          doc.$set.suburb = suburb;
          return doc; //autoForm magic commence
          },
       insert: function(doc) {
          // var suburbString = AutoForm.getFieldValue("longsuburb");
          // var postcode = suburbString.substring(suburbString.lastIndexOf(",")+2,suburbString.length);
          // var suburb = suburbString.substring(0,suburbString.indexOf(","));
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
	    }
	}    
});


