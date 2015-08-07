angular.module('page').controller( 'pageCtrl', [ '$scope', '$rootScope', '$q', '$element', '$compile', 'Website', pageCtrl ] );
// There is also all the controllers to the 'page' module in 'admin/page/controller.js'

/**
 * The "Page Controller" is responsible for:
 * - Getting the "website data", and adding it to scope, for all descendants to use.
 * - Loading the page meta-data.
 * - TODO: Building a stylesheet on-the-fly for the used bricks & base-template.
 * - Rendering the "base-template", and then activate the placeholder-controllers inside.
 */

function pageCtrl( $scope, $rootScope, $q, $element, $compile, Website ) {

  getPage( $q, Website, window.location.pathname ).then(function( page ) {
    // A page can (to the public) only have 1 object of content, and therefore we know it is also [0]
    var pageContent = page.content[0];

    $rootScope.pageContent = pageContent;

    // Rendering the "base-template", directly from the "website-data".
    $element.find('body').html( pageContent.template.html.public );

    // Activating it's descendant angular-modules, from just plain markup to understanding ng-* etc.
    $compile( $element.contents() )( $scope );
  });
}


////////////////////
///// PARTIALS /////
////////////////////

function getPage ( $q, Website, path ) {
  var dfrd = $q.defer();

  // We do "Website.get()" without passing a array, to get the current page.
  Website.get( [ path ] ).then(function( response ) {
    // First we are checking to see if there was a response we could actually use,
    // For it to be usable, we need a object, that has a website - and that website need to have pages.
    if( typeof(response) == 'object' && response.hasOwnProperty('website') && response.website.hasOwnProperty('pages') ) {
      var website = response.website;
      var page;

      // We then need to check if the page we are about to show the user is actually in the response, as requested.
      for( var i = 0; i < website.pages.length; i++ ) {
        var responsePage = website.pages[i];

        if(  responsePage.link == path ) {
          page = responsePage;
          break;
        }
      }

      if( typeof(page) == 'object' ) {
        dfrd.resolve( page );
      }
      else {
        dfrd.reject('The page was requested, and data was received in the correct format, but page was not there. (' +  window.location.pathname + ')');
      }
    }
    else {
      dfrd.reject('The page was requested, and data was received, but not in correct format.');
    }
  });

  return dfrd.promise;
}