angular.module('page').controller( 'pageCtrl', [ '$scope', '$element', '$compile', 'Website', pageCtrl ] );

/**
 * The "Page Controller" is responsible for:
 * - Getting the "website data", and adding it to scope, for all descendants to use.
 * - Loading the page meta-data.
 * - TODO: Building a stylesheet on-the-fly for the used bricks & base-template.
 * - Rendering the "base-template", and then activate the placeholder-controllers inside.
 */
// TODO: Make the pageCtrl support ng-view
function pageCtrl( $scope, $element, $compile, Website ) {
  // We do "Website.get()" without passing a array, to get the current page.
  Website.get().then(function( response ) {
    // First we are checking to see if there was a response we could actually use,
    // For it to be usable, we need a object, that has a website - and that website need to have pages.
    if( typeof(response) == 'object' && response.hasOwnProperty('website') && response.website.hasOwnProperty('pages') ) {
      var website = response.website;
      var page;

      // We then need to check if the page we are about to show the user is actually in the response, as requested.
      for( var i = 0; i < website.pages.length; i++ ) {
        var responsePage = website.pages[i];

        if(  responsePage.link == window.location.pathname ) {
          page = responsePage;
          break;
        }
      }

      if( typeof(page) == 'object' ) {
        // A page can (to the public) only have 1 object of content, and therefore we know it is also [0]
        var pageContent = page.content[0];

        $scope.pageContent = pageContent;

        // Rendering the "base-template", directly from the "website-data".
        $element.find('body').html( pageContent.template.html );

        // Activating it's descendant angular-modules, from just plain markup to understanding ng-* etc.
        $compile( $element.contents() )( $scope );
      }
      else {
        alert('The page was requested, and data was received in the correct format, but page was not there. (' +  window.location.pathname + ')');
      }
    }
    else {
      alert('The page was requested, and data was received, but not in correct format.');
    }
  });
}