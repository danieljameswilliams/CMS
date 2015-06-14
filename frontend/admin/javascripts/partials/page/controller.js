angular.module('page').controller( 'pageStructureCtrl', [ '$scope', 'Website', pageStructureCtrl ] );
angular.module('page').controller( 'pageDesignerCtrl', [ '$scope', '$rootScope', '$q', '$routeParams', '$sce', '$compile', 'Website', pageDesignerCtrl ] );
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

function pageDesignerCtrl ( $scope, $rootScope, $q, $routeParams, $sce, $compile, Website ) {
  var pageId = $routeParams.id;

  getPage( $q, Website, '/' ).then(function( page ) {
    // TODO: Find out what content Array Index it should be saved on (New/Exisiting draft or something else)
    var pageContent = page.content[0];

    $rootScope.pageContent = pageContent;

    // Rendering the "base-template", directly from the "website-data".
    $scope.baseTemplateHTML = $sce.trustAsHtml( pageContent.template.html );

    // Event Listeners
    $scope.$watch('pageContent', function( newValue, oldValue ) { return onPageContentChange.call( this, newValue, oldValue, pageId ); }, true);

    // We need to compile the baseTemplate to make the controllers of the blocks and the bricks run.
    // Normally we would just write "$compile( $element.contents() )( $scope );", but because the content is rendered via
    // the router.templateUrl, we don't have the access to $element yet.

    // So instead this is done in HTML (page.html) <div class="page" bind-html-compile="baseTemplateHTML"></div>
    // Using a 3rd party plugin called bind-html-compile https://github.com/incuna/angular-bind-html-compile
  });
}


////////////////////
///// PARTIALS /////
////////////////////

function getIndexInPagesArrayFromPageID ( pageId ) {
  var pages = JSON.parse( sessionStorage.getItem('website') ).website.pages;

  for ( var i = 0; i < pages.length; i++ ) {
    if ( pages[i]['id'] == pageId ) {
      return i;
    }
  }
  return;
}

function onPageContentChange ( newValue, oldValue, pageId ) {
  var result = JSON.parse( sessionStorage.getItem('website') );

  // Find out what index in Storage the website is, so you can overwrite it, with the new content.
  var index = getIndexInPagesArrayFromPageID( pageId );

  // TODO: Find out what content Array Index it should be saved on (New/Exisiting draft or something else)
  result.website.pages[ index ].content[0] = newValue;

  // Create a saveWebsiteToStorage method
  sessionStorage.setItem( 'website', JSON.stringify( result ) );
}