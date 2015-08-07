angular.module('placeholder').controller( 'placeholderCtrl', [ '$scope', '$rootScope', '$filter', '$element', '$compile', '$attrs', 'Website', placeholderCtrl ] );

/**
 * The "Placeholder Controller" is responsible for:
 * - Finding it's matching data source in "website-data".
 * - Making the scope availble for all descendants to use.
 * - Getting & Rendering the blocks-wrappers, in the correct order - and then activate the blocks-controllers.
 */
function placeholderCtrl( $scope, $rootScope, $filter, $element, $compile, $attrs, Website ) {
  var placeholderID = parseInt( $attrs.placeholderid );
  var placeholders = $rootScope.pageContent.placeholders;

  // Try to grep the matching placeholder-object from "website-data" to the placeholder we are currently editing.
  var placeholder = $filter('filter')( placeholders, function ( d ) { return d.id === placeholderID; } )[0];
  // There could be a placeholder in the markup, but not in the data,
  // so we need to check if they found a match in the data.
  if( typeof(placeholder) != 'undefined' ) {
    // Making the scope availble for all descendants to use.
    $scope.placeholder = placeholder;
  }
}