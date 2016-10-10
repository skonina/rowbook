Meteor.methods({

  changeVariable: function(a, b){
    i = RegisterLimit.find().fetch()[0]._id;
    RegisterLimit.update(i, {$set: {[a]: b}});
  },

  restartUsers: function(){
    Meteor.users.update({},{$set:{'decided': false}},{multi:true})
  },

  restartUser: function(a){
    Meteor.user.findOne(a).update({$set:{'decided': false}});
  },


	giveAdminPermission: function(userId) {
		Roles.addUsersToRoles(Meteor.users.findOne(userId), ['admin']);
	},

  clearEvents: function() {
    EventList.remove({});
    console.log("Events removed");
  },

  clearDays: function() {
    Days.remove({});
    console.log("Days removed");
  },

  populateEvents: function (events) {
    _.each(events, function (event) {
      EventList.insert(event);
    });
    _.each(EventList.find().fetch(), function(a){
      EventList.update(a._id, {$set: {'eventType':'free'}});
      EventList.update(a._id, {$set: {'users':[] }});
      EventList.update(a._id, {$set: {'limit': 1 }});
      // EventList.update(a._id, {$set: {'registered': 0 }});
      
      
    });
    console.log("Events Populated");
  },

  populateDays: function () {
    _.each(_.groupBy(EventList.find().fetch(), function(a){ return moment(a.start.dateTime).format('DDD'); }), function (a) {
      Days.insert(a);
      });

    console.log("Days Populated");
  },
  
  eventRemove: function(a) {
    EventList.remove(a);
    console.log('Event Removed!');
  },
  
  
  eventUpdate: function (a, b, c) {
    console.log('trying to update '+ a + ' ' + b + ' ' + c);
    EventList.update({_id:a}, {$set: {[b]: c} });
  },
  
  eventUpdateDateStart: function (event, value) {
         EventList.update({_id: event}, {
      $set: {'start.dateTime': value} }
      );
  },
  
  eventUpdateDateEnd: function (event, value) {
         EventList.update({_id:event}, {
      $set: {'end.dateTime': value} }
      );
  },
  
  userClear: function () {
    user = Meteor.user();
    Meteor.users.update(user._id, {$set: {'free': 0}});
    Meteor.users.update(user._id, {$set: {'payable': 0}});
    // _.each(user.events, function (a){
    //   EventList.update(a, {$inc: {'registered': -1} } );
    // });
    var q = [];
    if(user.events.length)
      Meteor.users.update(user._id, {$set: {'events': q }});
    console.log(user);
    
    
    
  },
  
  eventSet: function (event, user) {
    var Type = EventList.findOne(event).eventType;
    // var count = Session.get(Type);
    // var list = Session.get("list");
    // if(count == undefined)
    //     count = 0;
    // if(list == undefined)
    //     list = [];

    // console.log(count);
    // console.log(Type);
    
    if(_.include(Meteor.users.findOne(user).events,event)){                               //wyjebywanie
      // count--;
      // Session.set(Type, count);

      // list = _.without(list, event);
      // Session.set('list',list);

      Meteor.users.update(user, {$pull: {events: event}});
      // EventList.update(event, {$inc: {registered: -1} } );
      // EventList.update(event, {$pull: {users: user}});
      Meteor.users.update(user, {$inc: {[Type]: -1}});
      // console.log(Meteor.users.findOne(user).Type);
      Session.set("Q",true);
    }else{
      
      if(Type == 'notLimited'){
        Meteor.users.update(user, {$push: {events: event}});
        // EventList.update(event, {$inc: {registered: 1} } );
        // EventList.update(event, {$addToSet: {users: user}});
        // count++;
        // Session.set(Type, count);

        // list.push(event);
        // Session.set('list',list);
          

        Session.set("L_add", true);
        Session.set("Q",true);
      }
      
      if(Type == 'free'){
        if(Meteor.users.findOne(user).free < RegisterLimit.find().fetch()[0].free){
          Meteor.users.update(user, {$push: {events: event}});
          // EventList.update(event, {$inc: {registered: 1} } );
          // EventList.update(event, {$addToSet: {users: user}});
          Meteor.users.update(user, {$inc: {free: 1}});

          // count++;
          // Session.set(Type, count);

          // list.push(event);
          // Session.set('list',list);
          
          Session.set("F_add", true);
          
          Session.set("Q",true);
        }else{
          Session.set("F_limit",true);
        }
      }
      
      if(Type == 'payable'){
        if(Meteor.users.findOne(user).payable < RegisterLimit.find().fetch()[0].payable){
          Meteor.users.update(user, {$push: {events: event}});
          // EventList.update(event, {$inc: {registered: 1} } );
          // EventList.update(event, {$addToSet: {users: user}});
          Meteor.users.update(user, {$inc: {payable: 1}});
          Session.set("Q",true);
          Session.set("P_add", true);

          // count++;
          // Session.set(Type, count);

          // list.push(event);
          // Session.set('list',list);
          
          
        }else{
          Session.set("P_limit",true);
        }
      }
      //wpierdalanie
    
    // add if depending on the type of the event
      // if(Meteor.users.findOne(user).events.length < RegisterLimit.find().fetch()[0].number){
      //   Meteor.users.update(user, {$push: {events: event}});
      //   EventList.update(event, {$inc: {registered: 1} } );
      //   Session.set("Q",true);
      //   // $(q.target).parent().prev().toggleClass("chosen");
      // }else{
      //   if(Meteor.users.findOne(user).events.length == RegisterLimit.find().fetch()[0].number){
      //     Session.set("T",true);
      //     // Materialize.toast("Sorry, you have used your limit of events. Please uncheck some of them to register for this one" , 4000);
      //   }
      // }
    }
  },
  
  userDecide: function(user) {
    Meteor.users.update(user, {$set: {decided: true}});

    EventList.update({}, {$pull: {users: user} },{multi:true});
    //remember to delete users form previous -> decrease their registered length

    _.each(Meteor.users.findOne(user).events, function(event){
      EventList.update(event, {$addToSet: {users: user}});
       // if(! _.include(EventList.findOne(event).users, event)){
       // {console.log('NEW'); EventList.update(event, {$inc: {registered: 1} } );}}
    });
    // _.each(EventList.find().fetch(), function(event){
    //   EventList.update(event._id, {$set: {registered: event.users.length}});
    // });
  },

  userManuallyAdd: function(user, event_w) {
    event = event_w._id;
    type=event_w.type;
    console.log('# ' +event +' '+user);
    EventList.update(event, {$addToSet: {users: user}});
    Meteor.users.update(user, {$addToSet: {events: event}});
    Meteor.users.update(user, {$inc: {[type]: 1}});
  },

  userRemove: function (user) {
    _.each(Meteor.users.findOne(user).events, function(event){
      EventList.update(event, {$pull: {users: user}});
    });

    Meteor.users.remove(user);
  },

  userEventRemove: function(user, event) {
    EventList.update(event, {$pull: {users: user}});
    // EventList.update(event, {$inc: {registered: -1}});
    Meteor.users.update(user, {$pull: {events: event}});
    Meteor.users.update(user, {$inc: {[EventList.findOne(event).eventType]: -1}});
  },

  sessionEnd: function(doc) {



    Events.update(doc._id, doc.modifier);
    Events.update(doc._id, {$set: {state: 'done'}});
    var session = Events.findOne(doc._id);


    
    
    // console.log(session);
    // // console.log(doc);
    // console.log(doc._id);
    // console.log(doc.modifier);
    // console.log(doc.modifier[0].distance);
    // console.log(doc.modifier['$set'].distance);


    
    // console.log(this);
    // console.log(documentId);
    
    
    
    // console.log(session.distance);
    // console.log(session.peopleIDs);
    
    // if(session.state)

    var d2=new Date();
    var d1 = session.dateStarted;
    var m1 = moment(d1);
    var m2 = moment(d2);
    var diff = m2.diff(m1, 'minutes');
    Events.update(doc._id, {$set: {dateEnded: d2}});
    Events.update(doc._id, {$set: {time: diff}});
    // Events.update(session._id, {$set: {comment: doc.comment}});
    var session = Events.findOne(doc._id);
    console.log(session);
    
    _.each(session.peopleIDs, function (user) {
      console.log(user);
      Meteor.users.update(user, {$inc: {totalDistance: session.distance}});
      Meteor.users.update(user, {$inc: {totalTime: session.time}});
      
    });

  },

  sessionStart: function(session) {
    Events.update(session, {$set: {state: 'ongoing'}});
  },



  parseUpload( data ) {
      // check( data, Array );

      for ( let i = 0; i < data.length; i++ ) {
        let item   = data[ i ];
        let exists = Meteor.users.findOne({ "emails.address" : item.Email });

        if ( !exists ) {
          Accounts.createUser({profile: {name: item.Efternamn + " " + item.Förnamn}, password: "akademiska", email: item.Email});
        } else {
          console.warn( 'Rejected. This item already exists.' );
        }
      }
    },


  userUpdate: function(doc) {
    import { Accounts } from 'meteor/accounts-base';

    // check(doc, Schema.userUpdateSchema);

    console.log(doc);
    console.log(Meteor.user()._id);

    if(doc.name)
      Accounts.setUsername(Meteor.user()._id, doc.name);
    if(doc.password)
      Accounts.setPassword(Meteor.user()._id, doc.password);
    if(doc.totalRowedDistance)
      Meteor.users.update(Meteor.user()._id, {$set: {totalDistance: doc.totalRowedDistance}});
  },

  sendMessage: function(doc) {
    console.log(doc.message);
    _.each(Meteor.users.find().fetch(), function(user){
      console.log(user._id);
      Notifications.insert({
        owner: user._id, title: doc.message
      });
    });
  } 








}); //end of Methods



// paginatedEvents = new Meteor.Pagination(Events, {
//   perPage:6,
//   templateName: 'paginatedEvents',
//   itemTemplate: 'eventDone'

// });

