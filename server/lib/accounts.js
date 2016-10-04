// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration entry
  
  // ServiceConfiguration.configurations.update(
  //   { service: "facebook" },
  //   { $set: {
  //       appId: "539729696185341",
  //       secret: "d56eba6a8725480d277f0dacb7727eec"
  //     }
  //   },
  //   { upsert: true }
  // );
  

  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
  // ServiceConfiguration.configurations.update(
  //   { service: "google" },
  //   { $set: {
  //       clientId: "766997000709-cogelu7ci0k8436qsjsp63jb7arbs8jo.apps.googleusercontent.com",
  //       secret: "VfExDvW-84RlpDtbYSi1cZzD"
  //     }
  //   },
  //   { upsert: true }
  // );

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});
