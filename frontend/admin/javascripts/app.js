/**
 * Installed Apps,
 * All modules are put into its own folder with it's own 'controller and service'
 */

angular.module('router', []);

angular.module('dashboard', []);

angular.module('settings', []);

////////////////////
///// FRONTEND /////
////////////////////

// "Website" is used to get; and set; all data used in the app,
// And the other apps then get; and set; their data from and to this module.
angular.module('website', []);

// "Page" is used to load the meta data, the appropriate styles for the used bricks.
// It is also used to render the base-template and calling the placeholder modules.
angular.module('page', []);

// "Placeholder" is used to render the appropriate blocks for the matching placeholder.
// It would commonly be used in multiple instances, created from dynamic base-template markup.
angular.module('placeholder', []);

// "Block" is used to create a DOM wrapper around the appropriate bricks for the matching block.
angular.module('block', []);

// "Brick" is used to render a brick from a given template and context.
angular.module('brick', []);


/**
 * Main App,
 */

var app = angular.module('CMS', [
  // Dependencies
  'ngRoute',
  'angular-bind-html-compile',

  // Admin
  'router',
  'dashboard',

  // Public
  'website',
  'page',
  'placeholder',
  'block',
  'brick'
]);