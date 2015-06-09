/**
 * Installed Apps,
 * All modules are put into its own folder with it's own 'controller and service'
 */

// TODO: Login Service
// TODO: Page Collections controller (Page structure viewer)
// TODO: Page Designer (Extensions to Page modules)

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
 * TODO: Check if the modules could be initialized from parent-module instead of from main-app
 */

var app = angular.module('CMS', [
  // Admin
  'ngRoute',

  // Public
  'website',
  'page',
  'placeholder',
  'block',
  'brick'
]);