angular.module('brick').controller( 'brickCtrl', [ '$scope', '$filter', '$element', '$attrs', 'Website', brickCtrl ] );

/**
 * The "Block Controller" is responsible for:
 * - Finding it's matching data source in "website-data".
 * - TODO: Rendering itself with the given html-template.
 */
function brickCtrl( $scope, $filter, $element, $attrs, Website ) {
  var brickID = parseInt( $attrs.brickId );
  var block = $scope.$parent.block;

  // Try to grep the matching bricks-object from "website-data" to the brick we are currently editing.
  var brick = $filter('filter')( block.bricks, function (d) { return d.id === brickID; } )[0];

  $element.html( brick.name );
}