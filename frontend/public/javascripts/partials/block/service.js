angular.module('block').factory('Block', function() {
  return {
    create: function( block ) {
      return createBlockWrapperElement.call( this, block );
    }
  };
});

function createBlockWrapperElement( block ) {
  // TODO: Create the element more programatically.
  var element = '<div data-ng-controller=\"blockCtrl\" class=\"block_section\" data-block-id=\"' + block.id + '\" data-brick-count=\"' + block.bricks.length + '\"></div>';

  return element;
}