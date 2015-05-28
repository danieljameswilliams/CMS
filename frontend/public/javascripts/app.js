/**
 * Installed Apps,
 * All modules are put into its own folder with it's own 'controller and service'
 */

// "Website" is used to get; and set; all data used in the app,
// And the other apps then get; and set; their data from and to this module.
angular.module('website', []);

// We add them all to the main app.
var app = angular.module('CMS', [
  'website'
]);