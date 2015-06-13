angular.module('brick').controller( 'brickCtrl', [ '$scope', '$rootScope', '$filter', '$element', '$compile', '$attrs', 'Website', brickCtrl ] );

/**
 * The "Block Controller" is responsible for:
 * - Finding it's matching data source in "website-data".
 * - Adding each property as key's in the $scope.
 * - Rendering itself with the given html-template.
 */
function brickCtrl( $scope, $rootScope, $filter, $element, $compile, $attrs, Website ) {
  var brickID = parseInt( $attrs.brickId );
  var block = $scope.$parent.block;

  // Try to grep the matching bricks-object from "website-data" to the brick we are currently editing.
  var brick = $filter('filter')( block.bricks, function ( d ) { return d.id === brickID; } )[0];

  // Making the scope availble for the template to use.
  $scope.brick = brick;

  var mode = _getProjectFolderByHost();

  // Rendering the plain markup of the newly created bricks-wrappers.
  // The "mode" will determine if we shall use the "public" html file (with clear-text)
  // or the "admin" file that will render input to edit.
  $element.html( brick.html[ mode ] );

  // Activating the brick angular-bindings, from just plain markup to understanding ng-* etc.
  $compile( $element.contents() )( $scope );
}


////////////////////
///// PARTIALS /////
////////////////////

function _getProjectFolderByHost() {
  var host = window.location.host;

  if( host == '127.0.0.1:8888' || host === 'localhost:8888' ) {
    return 'admin';
  }
  else {
    return 'public';
  }
}