angular.module('page').controller( 'pageStructureCtrl', [ '$scope', 'Website', pageStructureCtrl ] );
angular.module('page').controller( 'pageDesignerCtrl', [ '$scope', 'Website', pageDesignerCtrl ] );


function pageStructureCtrl ( $scope, Website ) {
  // If the request has a valid authentication header,
  Website.fetchAll().then(function() {

  });
}

function pageDesignerCtrl ( $scope, Website ) {}