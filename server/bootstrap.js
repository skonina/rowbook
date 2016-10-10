// if (!Roles.userIsInRole(Meteor.users.findOne({'profile':{'name':'Boathouse Panel'}}), ['boathouse'])) {
//     Roles.addUsersToRoles(Meteor.users.findOne({'profile':{'name':'Teodor W.'}})._id, ['admin']);
//     }
    
Accounts.onCreateUser(function(options, user) {
    user.events = [];
    user.totalTime = 0;
    user.totalDistance = 0;
    if (options.profile) {
      user.profile = options.profile;
    }
    return user;
  });
  

// if ( Meteor.users.find().count() === 1 ) {
    // if (!Roles.userIsInRole(Meteor.users.findOne({'profile':{'name':'Teodor W.'}}), ['admin'])) {
//     Roles.addUsersToRoles(Meteor.users.findOne({'profile':{'name':'Teodor W.'}})._id, ['admin']);
//     }
    
    
    
    // Accounts.createUser({
    //     username: 'admin',
    //     email: 'admin@com',
    //     password: 'flyingpotato',
    // });
    // Roles.addUsersToRoles(Meteor.users.findOne({'email': 'admin'})._id, ['admin']);
// }






