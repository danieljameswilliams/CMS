/**
 * Installed Apps,
 * All modules are put into its own folder with it's own 'controller and service'
 */

// "Website" is used to get; and set; all data used in the app,
// And the other apps then get; and set; their data from and to this module.
angular.module('website', []);

// "Page" is used to load the meta data, the appropriate styles for the used bricks.
// It is also used to render the base-template and calling the placeholder modules.
angular.module('page', []);

// "Placeholder" is used to render the appropriate blocks for the matching placeholder.
// It would commonly be used in multiple instances, created from dynamic base-template markup.
angular.module('placeholder', []);

/**
 * Main App,
 */

var app = angular.module('CMS', [
  'angular-bind-html-compile',

  'website',
  'page',
  'placeholder'
]);