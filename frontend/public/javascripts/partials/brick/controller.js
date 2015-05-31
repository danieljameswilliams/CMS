angular.module('brick').controller( 'brickCtrl', [ '$scope', '$filter', '$element', '$attrs', 'Website', brickCtrl ] );

function brickCtrl( $scope, $filter, $element, $attrs, Website ) {
  Website.get().then(function(response) {
    var brickID = parseInt( $attrs.brickId );
    var blockID = parseInt( $scope.$parent.blockId );
    var placeholderID = parseInt( $scope.$parent.$parent.placeholderId );
    var placeholders = response.website.pages[0].content[0].placeholders;

    // Try to grep the matching data-object to the placeholder of the block that we are currently editing.
    var placeholder = $filter('filter')( placeholders, function (d) { return d.id === placeholderID; } )[0];

    // Try to grep the matching data-object to the block we are currently editing.
    var block = $filter('filter')( placeholder.blocks, function (d) { return d.id === blockID; } )[0];

    // Try to grep the matching data-object to the block we are currently editing.
    var brick = $filter('filter')( block.bricks, function (d) { return d.id === brickID; } )[0];

    $element.html( brick.name );
  });
}