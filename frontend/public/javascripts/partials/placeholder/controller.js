angular.module('page').controller( 'placeholderCtrl', [ '$scope', '$filter', '$element', '$compile', '$attrs', 'Website', 'Block', placeholderCtrl ] );

function placeholderCtrl( $scope, $filter, $element, $compile, $attrs, Website, Block ) {
  Website.get().then(function(response) {
    var placeholderID = parseInt( $attrs.placeholderId );
    var placeholders = response.website.pages[0].content[0].placeholders;

    // Try to grep the matching data-object to the placeholder we are currently editing.
    var placeholder = $filter('filter')( placeholders, function (d) { return d.id === placeholderID; } )[0];

    // There could be a placeholder in the markup, but not in the data,
    // so we need to check if they found a match in the data.
    if( typeof(placeholder) != 'undefined' ) {
      var blocks = placeholder.blocks.sort(function( a, b ) {
        return a.order - b.order;
      });
      var blocksHTML = [];

      for( var i = 0; i < blocks.length; i++ ) {
        var block = blocks[i];
        var blockElement = Block.create( block );

        blocksHTML.push( blockElement );
      }
    }

    $scope.placeholderId = $attrs.placeholderId;

    $element.html( blocksHTML.join('') );
    $compile( $element.contents() )( $scope );
  });
}