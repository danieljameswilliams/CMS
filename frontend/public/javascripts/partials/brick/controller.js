angular.module('brick').controller( 'brickCtrl', [ '$scope', '$filter', '$element', '$compile', '$attrs', 'Website', brickCtrl ] );

/**
 * The "Block Controller" is responsible for:
 * - Finding it's matching data source in "website-data".
 * - Adding each property as key's in the $scope.
 * - Rendering itself with the given html-template.
 */
function brickCtrl( $scope, $filter, $element, $compile, $attrs, Website ) {
  var brickID = parseInt( $attrs.brickId );
  var block = $scope.$parent.block;

  // Try to grep the matching bricks-object from "website-data" to the brick we are currently editing.
  var brick = $filter('filter')( block.bricks, function ( d ) { return d.id === brickID; } )[0];

  // Making the scope availble for the template to use.
  $scope.brick = {
    id: brick.id,
    name: brick.name,
    order: brick.order,
    properties: {}
  };

  // Populating $scope.brick.properties with the brick properties.
  for( var i = 0; i < brick.properties.length; i++ ) {
    var property = brick.properties[i];
    $scope.brick.properties[ property.key ] = {
      name: property.name,
      value: property.value
    };
  }

  // Rendering the plain markup of the newly created bricks-wrappers.
  $element.html( brick.html );

  // Activating the brick angular-bindings, from just plain markup to understanding ng-* etc.
  $compile( $element.contents() )( $scope );
}