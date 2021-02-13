// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://www.ttvn.nl/api',
  loginUrl: 'https://www.ttvn.nl/api/signin',
  databaseName: 'ttest',

  firebase: {
    apiKey: "AIzaSyBrkqBOtSElrG76AIjsaHe9SrmZA_0gjrY",
    authDomain: "ttvn-app.firebaseapp.com",
    databaseURL: "https://ttvn-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ttvn-app",
    storageBucket: "ttvn-app.appspot.com",
    messagingSenderId: "953979335612",
    appId: "1:953979335612:web:7cdfc82b92decee36231b9",
    measurementId: "G-FKPQBQ8CTR"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
