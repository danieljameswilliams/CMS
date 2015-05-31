angular.module('page').controller( 'placeholderCtrl', [ '$scope', '$filter', '$element', '$compile', '$attrs', 'Website', 'Block', placeholderCtrl ] );

/**
 * The "Placeholder Controller" is responsible for:
 * - Finding it's matching data source in "website-data".
 * - Making the scope availble for all descendants to use.
 * - Getting & Rendering the blocks-wrappers, in the correct order - and then activate the blocks-controllers.
 */
function placeholderCtrl( $scope, $filter, $element, $compile, $attrs, Website, Block ) {
  var placeholderID = parseInt( $attrs.placeholderId );
  var placeholders = $scope.$parent.pageContent.placeholders;

  // Try to grep the matching placeholder-object from "website-data" to the placeholder we are currently editing.
  var placeholder = $filter('filter')( placeholders, function ( d ) { return d.id === placeholderID; } )[0];

  // There could be a placeholder in the markup, but not in the data,
  // so we need to check if they found a match in the data.
  if( typeof(placeholder) != 'undefined' ) {
    var blocks = placeholder.blocks.sort(function( a, b ) {
      return a.order - b.order;
    });
    var blocksHTML = [];

    // Getting the blocks-wrappers <div/>-container
    for( var i = 0; i < blocks.length; i++ ) {
      var block = blocks[i];
      var blockElement = Block.create( block );

      blocksHTML.push( blockElement );
    }

    // Making the scope availble for all descendants to use.
    $scope.placeholder = placeholder;

    // Rendering the plain markup of the newly created blocks-wrappers.
    $element.html( blocksHTML.join('') );

    // Activating the block angular-modules, from just plain markup to understanding ng-* etc.
    $compile( $element.contents() )( $scope );
  }
}