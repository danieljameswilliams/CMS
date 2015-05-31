angular.module('brick').controller( 'brickCtrl', [ '$scope', '$element', brickCtrl ] );

function brickCtrl( $scope, $element ) {
  $element.html('Brick');
}