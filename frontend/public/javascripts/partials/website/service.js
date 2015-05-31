angular.module('website').factory('Website', function( $http, $q ) {
  return {
    /**
     * Use the .get() method to retrieve data for a specific page, with additional website data.
     * For demo purposes, see "/mocks/frontend.json"
     * @param  {Array}  Allow one or more pages to be retrieved in one request, takes both ID or pathname
     * @return {Promise}
     */
    get: function( pageIDs ) {
      // TODO: Cache the response for a while via localStorage, so we dont need to fetch the same data,
      // and extend the response "pages" as they are loaded, for better history.back performance.
      // TODO: Figure out what page to get, from querystring or something.
      return _getWebsite.call( this, pageIDs, $http, $q );
    }
  };
});

function _getWebsite( pageIDs, $http, $q ) {
  // TODO: Add to a async task: Collect pageIDs of localStorage pages that are older than some refresh-rate (to be defined) specific for this domain, and refresh the pages.

  // If no parameter was passed in, we just take the current pathname,
  // to request from remote or localStorage.
  pageIDs = pageIDs || [ window.location.name ];




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