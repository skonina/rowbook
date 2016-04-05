
AutoForm.setDefaultTemplate('materialize');
AccountsTemplates.addField({
        _id: 'name',
        type: 'text',
        required: true,
        displayName: 'Name & Surname',
    });

// AccountsTemplates.addField({
//     _id: 'course',
//     type: "select",
//     required: true,
//     displayName: "Your new KTH department",
//     select: [
//         {
//         text: "Apple",
//         value: "aa",
//       }, {
//         text: "Banana",
//         value: "bb",
//       }, {
//         text: "Carrot",
//         value: "cc",
//       },
//     ],
// });


// Deps.autorun(function() {
//     Meteor.subscribe('users');
//     Meteor.subscribe('events');
//     Meteor.subscribe('limit');
    
// });




// UI.registerHelper("users", function () {
//   return Meteor.users.find();
// }),

// UI.registerHelper("initCollapsible", function () {
//     $('.collapsible').collapsible();
//     console.log("Collapsible ON!");
// }),

// UI.registerHelper("boats", function () {
//     return Boats.find();
// }),

// UI.registerHelper("groups", function () {
//     return Groups.find();
// }),

// UI.registerHelper("events", function () {
//     return Events.find();
// }),

// UI.registerHelper("peopleInGroup", function (a) {
//     return Groups.findOne(a).fetch();
// })
    