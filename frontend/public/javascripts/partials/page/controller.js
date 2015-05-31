angular.module('page').controller( 'pageHeadCtrl', [ '$scope', 'Website', pageHeadCtrl ] );
angular.module('page').controller( 'pageBodyCtrl', [ '$scope', '$element', '$compile', 'Website', pageBodyCtrl ] );

function pageHeadCtrl( $scope, Website ) {
  Website.get().then(function(response) {
    var website = response.website;
    // TODO: Check that [0] is the correct page matching this location.pathname
    var page = response.website.pages[0];
    var pageContent = page.content[0];

    $scope.website = {
      author: website.author,
      culture: website.culture,
      designer: website.designer,
      generator: 'CMS'
    };

    $scope.page = {
      description: pageContent.description,
      title: pageContent.title
    };
  });
}

function pageBodyCtrl( $scope, $element, $compile, Website ) {
  Website.get().then(function(response) {
    var website = response.website;
    // TODO: Check that [0] is the correct page matching this location.pathname
    var page = response.website.pages[0];
    var pageContent = page.content[0];

    $element.append( pageContent.template.html );
    $compile( $element.contents() )( $scope );
  });
}