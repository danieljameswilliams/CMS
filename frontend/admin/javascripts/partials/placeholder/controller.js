angular.module('placeholder').controller( 'placeholderCtrlAdmin', [ '$scope', '$rootScope', '$controller', '$filter', '$element', '$compile', '$attrs', 'Website', placeholderCtrlAdmin ] );

function placeholderCtrlAdmin($scope, $rootScope, $controller, $filter, $element, $compile, $attrs, Website) {
  // Initialize the super class and extend it.
  angular.extend(this, $controller( 'placeholderCtrl', { $scope: $scope, $rootScope: $rootScope, $filter: $filter, $element: $element, $compile: $compile, $attrs: $attrs, Website: Website } ));

  $scope.onAddNewBlockButtonClick = function() {
    return addNewBlock.call( this, $scope, $attrs );
  };

  $scope.onAddNewBrickButtonClick = function() {
    return addNewBrick.call( this, $scope, $attrs );
  };
}

////////////////////
///// PARTIALS /////
////////////////////

function addNewBlock($scope, $attrs) {
  var placeholderId = parseInt($attrs.placeholderid);

  var placeholders = $scope.pageContent.placeholders;
  var placeholderIndex = placeholders.map(function(x) {return x.id; }).indexOf(placeholderId);

  $scope.pageContent.placeholders[placeholderIndex].blocks.push({ 'hello': 'world'});
}

function addNewBrick($scope, $attrs) {
  var placeholderId = parseInt($attrs.placeholderid);

  var placeholders = $scope.pageContent.placeholders;
  var placeholderIndex = placeholders.map(function(x) {return x.id; }).indexOf(placeholderId);

  return $scope.pageContent.placeholders[placeholderIndex].blocks.push({ 'hello': 'world'});
}