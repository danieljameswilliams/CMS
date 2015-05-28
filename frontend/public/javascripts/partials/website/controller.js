angular.module('website').controller( 'placeholdersCtrl', _placeholderCtrl );

function _placeholderCtrl( $scope, Website ) {
  Website.get().then(function(response) {
    $scope.website = {
      author: response.website.author,
      designer: response.website.designer,
      culture: response.website.culture,
      generator: 'My CMS',
    };
    $scope.page = response.website.pages[0];
  });
}