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

Template.body.helpers({

    users: function () {
      return Meteor.users.find();
    },

    initCollapsible: function () {
        $('.collapsible').collapsible();
        console.log("Collapsible ON!");
    },

    boats: function () {
        return Boats.find();
    },

    groups: function () {
        return Groups.find();
    },

    events: function () {
        return Events.find();
    },

    peopleInGroup: function (a) {
        return Groups.findOne(a).fetch();
    },

    
});

    