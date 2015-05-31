angular.module('block').controller( 'blockCtrl', [ '$scope', '$filter', '$element', '$compile', '$attrs', 'Website', 'Brick', blockCtrl ] );

/**
 * The "Block Controller" is responsible for:
 * - Finding it's matching data source in "website-data".
 * - Making the scope availble for all descendants to use.
 * - Getting & Rendering the bricks-wrappers, in the correct order - and then activate the bricks-controllers.
 */
function blockCtrl( $scope, $filter, $element, $compile, $attrs, Website, Brick ) {
  var blockID = parseInt( $attrs.blockId );
  var placeholder = $scope.$parent.placeholder;

  // Try to grep the matching blocks-object from "website-data" to the block we are currently editing.
  var block = $filter('filter')( placeholder.blocks, function (d) { return d.id === blockID; } )[0];

  // There could be a block in the markup, but not in the data,
  // so we need to check if they found a match in the data.
  if( typeof(block) != 'undefined' ) {
    var bricks = block.bricks.sort(function( a, b ) {
      return a.order - b.order;
    });
    var bricksHTML = [];

    // Getting the bricks-wrappers <div/>-container
    for( var i = 0; i < bricks.length; i++ ) {
      var brick = bricks[i];
      var brickElement = Brick.create( brick );
      bricksHTML.push( brickElement );
    }
  }

  // Making the scope availble for all descendants to use.
  $scope.block = block;

  // Rendering the plain markup of the newly created bricks-wrappers.
  $element.html( bricksHTML.join('') );

  // Activating the brick angular-modules, from just plain markup to understanding ng-* etc.
  $compile( $element.contents() )( $scope );
}