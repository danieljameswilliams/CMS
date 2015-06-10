angular.module('page').controller( 'pageStructureCtrl', [ '$scope', 'Website', pageStructureCtrl ] );
angular.module('page').controller( 'pageDesignerCtrl', [ '$scope', '$q', '$routeParams', '$compile', 'Website', pageDesignerCtrl ] );
// There is also all the controllers to the 'page' module in 'public/page/controller.js'


function pageStructureCtrl ( $scope, Website ) {
  // If the request has a valid authentication header,
  Website.fetchAll().then(function( response ) {
    if( typeof(response) == 'object' && response.hasOwnProperty('website') && response.website.hasOwnProperty('pages') ) {
      var website = response.website;
      var pages = website.pages;

      // TODO: Move the _findWebsiteHost() function to a folder that is shared by "public" & "admin"
      // It works now, but the file structure don't show that they can call functions from each other.
      // Maybe some more isolated would be appropriate?
      $scope.host = _findWebsiteHost();

      $scope.pages = pages;
    }
    else {
      alert('The page was requested, and data was received, but not in correct format.');
    }
  });
}

function pageDesignerCtrl ( $scope, $q, $routeParams, $compile, Website ) {
  var pageID = $routeParams.id;

  getPage( $q, Website, '/' ).then(function( page ) {
    // A page can (to the public) only have 1 object of content, and therefore we know it is also [0]
    var pageContent = page.content[0];

    $scope.pageContent = pageContent;

    // Rendering the "base-template", directly from the "website-data".
    $scope.pageBaseTemplate = pageContent.template.html;

    // Activating it's descendant angular-modules, from just plain markup to understanding ng-* etc.
    //$compile( $element.contents() )( $scope );
  });
}


////////////////////
///// PARTIALS /////
////////////////////