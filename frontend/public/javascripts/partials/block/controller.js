angular.module('block').controller( 'blockCtrl', [ '$scope', '$filter', '$element', '$compile', '$attrs', 'Website', 'Brick', blockCtrl ] );

function blockCtrl( $scope, $filter, $element, $compile, $attrs, Website, Brick ) {
  var blockID = parseInt( $attrs.blockId );

  // Try to grep the matching data-object to the placeholder of the block that we are currently editing.
  var placeholder = $scope.$parent.placeholder;

  // Try to grep the matching data-object to the block we are currently editing.
  var block = $filter('filter')( placeholder.blocks, function (d) { return d.id === blockID; } )[0];

  // There could be a block in the markup, but not in the data,
  // so we need to check if they found a match in the data.
  if( typeof(block) != 'undefined' ) {
    var bricks = block.bricks.sort(function( a, b ) {
      return a.order - b.order;
    });
    var bricksHTML = [];

    for( var i = 0; i < bricks.length; i++ ) {
      var brick = bricks[i];
      var brickElement = Brick.create( brick );
      bricksHTML.push( brickElement );
    }
  }

  $scope.block = block;

  $element.html( bricksHTML.join('') );
  $compile( $element.contents() )( $scope );
}