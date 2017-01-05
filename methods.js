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

  userRemove: function (user) {
    _.each(Meteor.users.findOne(user).events, function(event){
      EventList.update(event, {$pull: {users: user}});
    });

    Meteor.users.remove(user);
  },



  sessionEnd: function(doc) {
    Events.update(doc._id, doc.modifier);
    Events.update(doc._id, {$set: {state: 'done'}});
    var session = Events.findOne(doc._id);

    var d2=new Date();
    var d1 = session.dateStarted;
    var m1 = moment(d1);
    var m2 = moment(d2);
    var diff = m2.diff(m1, 'minutes');
    Events.update(doc._id, {$set: {dateEnded: d2}});
    Events.update(doc._id, {$set: {time: diff}});
    // Events.update(session._id, {$set: {comment: doc.comment}});
    var session = Events.findOne(doc._id);
    
    _.each(session.peopleIDs, function (user) {
      var dist = Number(Meteor.users.findOne(user).totalDistance) + Number(session.distance);
      var diff = Number(Meteor.users.findOne(user).totalTime) + Number(session.time);
      
      Meteor.users.update(user, {$set: {totalDistance: dist}});
      Meteor.users.update(user, {$set: {totalTime: diff}});
      
    });

  },

  sessionStart: function(session) {
    Events.update(session, {$set: {state: 'ongoing'}});
  },

  // boatReport: function(doc){
  //   consoule.log
  // }



  parseUpload( data ) {
      // check( data, Array );

      import { Random } from 'meteor/random';

      for ( let i = 0; i < data.length; i++ ) {
        let item   = data[ i ];
        let exists = Meteor.users.findOne({ "emails.address" : item.Email });
        if ( !exists ) {
          var tempPassword = Random.secret(7);
          var tempUsername = item.Förnamn[0]+item.Förnamn[1]+item.Förnamn[2]+item.Efternamn[0]+item.Efternamn[1]+item.Efternamn[2];
          SSR.compileTemplate('htmlEmail', Assets.getText('welcome_mail.html'));
          
          let emailData = {
              name: item.Förnamn,
              tempPassword: tempPassword,
              tempUsername: tempUsername
          };



          // console.log(item.Typ);
          // console.log(item.Personnummer);
          // console.log(SSR.render('htmlEmail', emailData));
          
          Accounts.createUser({profile: {name: item.Förnamn + " " + item.Efternamn, personnummer: Number(item.Personnummer), membership: item.Typ,},username: tempUsername, password: tempPassword, email: item.Email, totalDistance: Number(item.Distance)});

          Email.send({
            from: "rowbooksystem@gmail.com",
            to: item.Email,
            subject: "Welcome to RowBook",
            html: SSR.render('htmlEmail', emailData)
          });


        } else {
          console.warn( 'Rejected. This item already exists.' );
        }
      }
    },


  userUpdate: function(doc) {
    import { Accounts } from 'meteor/accounts-base';

    // check(doc, Schema.userUpdateSchema);

    if(doc.name)
      Accounts.setUsername(Meteor.user()._id, doc.name);
    if(doc.password)
      Accounts.setPassword(Meteor.user()._id, doc.password);
    if(doc.totalRowedDistance)
      Meteor.users.update(Meteor.user()._id, {$set: {totalDistance: doc.totalRowedDistance}});
  },

  sendMessage: function(doc) {
    // console.log(doc.message);
    d = new Date();
    _.each(Meteor.users.find().fetch(), function(user){
      // console.log(user._id);
      Notifications.insert({
        owner: user._id, title: doc.message, date: d
      });
    });
  },

  readNotification: function(id) {
    Notifications.update(id, {$set: {read: true}});

  },

  sendDamageEmail: function(doc) {

    SSR.compileTemplate('htmlEmailDamage', Assets.getText('damage_mail.html'));

    let emailData2 = {
        a: doc.reports,
        b: doc.name
    };

    Email.send({
      from: "rowbooksystem@gmail.com",
      to: "teodor.wojcik@gmail.com",
      subject: "Damage reported at ARF",
      html: SSR.render('htmlEmailDamage', emailData2)
    });
  } 






  



}); //end of Methods
smtp = {
    username: 'rowbooksystem',   // eg: server@gentlenode.com
    password: 'flyingpotato',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }
process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

// Email.send({
//   from: "rowbooksystem@gmail.com",
//   to: "teodor.wojcik@gmail.com",
//   subject: "Meteor Can Send Emails via Gmail",
//   text: "Its pretty easy to send emails via gmail."
// });


// paginatedEvents = new Meteor.Pagination(Events, {
//   perPage:6,
//   templateName: 'paginatedEvents',
//   itemTemplate: 'eventDone'

// });

