angular.module('website').factory('Website', function( $http, $q ) {
  return {
    /**
     * Use the .get() method to retrieve data for a specific page, with additional website data.
     * For demo purposes, see "/interface/mocks/frontend.json"
     * @param  {Array}  Allow one or more pages to be retrieved in one request.
     * @param  {Boolean}
     * @return {Promise}
     */
    get: function( pagesArray, pageDataOnly ) {
      // TODO: Cache the response for a while via localStorage, so we dont need to fetch the same data,
      // and extend the response "pages" as they are loaded, for better history.back performance.
      return _getWebsite.call(this, pagesArray, pageDataOnly, $http, $q);
    }
  };
});

function _getWebsite( pagesArray, pageDataOnly, $http, $q ) {
  // TODO: Make the request take a PagesArray querystring to pass to server.
  // TODO: Make the request take a pageDataOnly querystring to pass to server.
  var dfrd = $q.defer();
  var response = $http.get('/mocks/frontend.json');

  response.success(function(response) {
    dfrd.resolve(response);
  })

  response.error(function(response) {
    dfrd.resolve(response);
  });

  return dfrd.promise;
}