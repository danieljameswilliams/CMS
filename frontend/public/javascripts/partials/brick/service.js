angular.module('brick').factory('Brick', function() {
  return {
    create: function( brick ) {
      return createBrickWrapperElement.call( this, brick );
    }
  };
});

function createBrickWrapperElement( brick ) {
  // TODO: Create the element more programatically.
  var element = '<div data-ng-controller=\"brickCtrl\" class=\"brick_section\" data-brick-id=\"' + brick.id + '\"></div>';

  return element;
}