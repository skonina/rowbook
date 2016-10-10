// if (!Roles.userIsInRole(Meteor.users.findOne({'profile':{'name':'Boathouse Panel'}}), ['boathouse'])) {
//     Roles.addUsersToRoles(Meteor.users.findOne({'profile':{'name':'Teodor W.'}})._id, ['admin']);
//     }
    
Accounts.onCreateUser(function(options, user) {
    console.log(options);
    user.events = [];
    user.totalTime = 0;
    if(!options.totalDistance)
        user.totalDistance = 0;
    else
        user.totalDistance = options.totalDistance;
    if(!options.profile.age)
        options.profile.age = 0;
    if(!options.profile.personnummer)
        options.profile.personnummer = 0;
    if(!options.profile.membership)
        options.profile.membership = 0;
    
    // user.age = 0;
    // user.personnummer = 0;
    // user.membership = 0;
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






