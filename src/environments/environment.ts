// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://www.ttvn.nl/api',
  loginUrl: 'https://www.ttvn.nl/api/signin',
  databaseName: 'ttest',

  // De mail url wijst naar mijn rasp pi. waar een python flask server draait. Deze handelt de mail requests af. Tevens notifications requests.
  mailUrl: 'http://84.104.233.194:5001',

  // de proxy url stuurt requests door naar de Rasp.Pi. Dit kan ook direct natuurlijk maar we gebruiken deze proxy om de https te ontwijken op de Pi
  // de service worker wil namelijk alleen via https en de pi heeft dit niet. 
  proxyUrl: 'https://www.ttvn.nl/api/proxy/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
