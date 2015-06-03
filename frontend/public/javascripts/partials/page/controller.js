angular.module('page').controller( 'pageCtrl', [ '$scope', '$element', '$compile', 'Website', pageCtrl ] );

/**
 * The "Page Controller" is responsible for:
 * - Getting the "website data", and adding it to scope, for all descendants to use.
 * - Loading the page meta-data.
 * - TODO: Building a stylesheet on-the-fly for the used bricks & base-template.
 * - Rendering the "base-template", and then activate the placeholder-controllers inside.
 */
function pageCtrl( $scope, $element, $compile, Website ) {
  Website.get().then(function( response ) {
    if( typeof(response) == 'object' && response.hasOwnProperty('website') && response.website.hasOwnProperty('pages') ) {
      var website = response.website;
      // TODO: Check that [0] is the correct page matching this location.pathname
      var page = website.pages[0];
      var pageContent = page.content[0];

      $scope.pageContent = pageContent;

      // Rendering the "base-template", directly from the "website-data".
      $element.find('body').html( pageContent.template.html );

      // Activating it's descendant angular-modules, from just plain markup to understanding ng-* etc.
      $compile( $element.contents() )( $scope );
    }
    else {
      alert('Something went wrong');
    }
  });
}