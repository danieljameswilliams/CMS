angular.module('page').controller( 'pageCtrl', [ '$scope', '$element', '$compile', 'Website', pageCtrl ] );

function pageCtrl( $scope, $element, $compile, Website ) {
  Website.get().then(function(response) {
    var website = response.website;
    // TODO: Check that [0] is the correct page matching this location.pathname
    var page = website.pages[0];
    var pageContent = page.content[0];

    $scope.pageContent = pageContent;

    // Rendering the base-template inside body, which contains placeholders,
    // where each placeholder will render it's own content.
    $element.find('body').html( pageContent.template.html );
    $compile( $element.contents() )( $scope );
  });
}