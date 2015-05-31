angular.module('brick').controller( 'brickCtrl', [ '$scope', '$filter', '$element', '$attrs', 'Website', brickCtrl ] );

function brickCtrl( $scope, $filter, $element, $attrs, Website ) {
  var brickID = parseInt( $attrs.brickId );

  // Try to grep the matching data-object to the block we are currently editing.
  var block = $scope.$parent.block;

  // Try to grep the matching data-object to the block we are currently editing.
  var brick = $filter('filter')( block.bricks, function (d) { return d.id === brickID; } )[0];

  $element.html( brick.name );
}