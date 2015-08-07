angular.module('website').factory( 'Website', [ '$http', '$q', '$filter', function( $http, $q, $filter ) {
  // MAYBE TODO: Loading Sitemap.xml and saving to sessionStorage, to avoid sending pathnames via AJAX and instead use ID's from Sitemap.

  return {
    /**
     * Use the .get() method to retrieve data for a specific page, with additional website data.
     * @param  {Array}  Allow one or more pages to be retrieved in one request, takes both ID or pathname
     * @return {Promise}
     */
    get: function( paths ) {
      return getWebsiteData.call( this, paths, $http, $q, $filter );
    },

    /**
     * Use the .fetch() method to force retrieve data for a specific page, with additional website data from remote.
     * @param  {Array}  Allow one or more pages to be retrieved in one request, takes both ID or pathname
     * @return {Promise}
     */
    fetch: function( paths ) {
      return fetchWebsiteData.call( this, paths, $http, $q );
    },

    fetchAll: function() {
      return fetchAllWebsiteData.call( this, $http, $q );
    }
  };
} ] );

function getWebsiteData( paths, $http, $q, $filter ) {
  // If no parameter was passed in, we just take the current pathname,
  var paths = (typeof(paths) !== 'undefined' && paths.length > 0) ? paths : [ window.location.pathname ];

  console.log('Asked for the pages: ', paths);

  // We create a variable of the page-objects we have already stored in sessionStorage.
  var storedPages = _grepPagesfromStorage( $filter, paths );
  var fetchPaths = $filter('filter')( paths, function( path ) { return _excludePathsFoundInStorage.call( this, path, storedPages ); } );

  console.log('Got ' + storedPages.length + ' from Storage');
  console.log('Have to fetch ' + fetchPaths.length + ' from Remote');

  // We now begin the fetching process from remote.
  var host = _findWebsiteHost();
  var url = 'http://127.0.0.1:5000/website/' + host + '/' + encodeURIComponent(fetchPaths) + '.json'; // http://api.cms.dk/website/www.example.com/%2F,%2Fabout-us.json

  if( fetchPaths.length > 0 ) {
    // We are now fetching the pages that wasn't already in Storage,
    // when we have fetched them (callback), we merge the pages together with Storage,
    // and return the requested-pages to whoever requested them.
    return _fetchPagesFromRemote( $q, $http, url ).then( function( response ) { return _saveFetchedPagesToStorage.call( this, $filter, response, paths ); } );
  }
  else {
    // If we already had all the pages we were looking for,
    // Then we just get the storedPages, which would only contain pages that were originally
    // in the paths-variable, which is what we want.
    var result = JSON.parse( sessionStorage.getItem('website') );
    result.website.pages = storedPages;

    var dfrd = $q.defer();
      dfrd.resolve( result );
    return dfrd.promise;
  }
}

function fetchWebsiteData ( paths, $http, $q ) {
  // If no parameter was passed in, we just take the current pathname,
  var paths = paths || [ window.location.pathname ];

  var host = _findWebsiteHost();
  var url = 'http://127.0.0.1:5000/website/' + host + '/' + encodeURIComponent(paths) + '.json'; // http://api.cms.dk/website/www.example.com/%2F,%2Fabout-us.json

  return _fetchPagesFromRemote( $q, $http, url );
}

function fetchAllWebsiteData ( $http, $q ) {
  var host = _findWebsiteHost();

  // If the user has a Authorization token, it will be added as a Request Header
  // In the $http-provider-config.
  var url = 'http://127.0.0.1:5000/website/' + host + '/all.json'; // http://api.cms.dk/website/www.example.com/all.json

  return _fetchPagesFromRemote( $q, $http, url );
}


////////////////////
///// PARTIALS /////
////////////////////

/**
 * Run through the paths-array to see which pages have already been saved
 * in sessionStorage and see, which needs to be fetched from remote.
 * @return {Array}
 */
function _grepPagesfromStorage ( $filter, paths ) {
  var storedPages = [];

  // Run through the paths-array to see which pages have already been saved in sessionStorage and see, which needs to be fetched from remote.
  if( typeof(Storage) !== 'undefined' && sessionStorage.getItem('website') !== null ) {
    var website = JSON.parse( sessionStorage.getItem('website') ).website; // TODO: How to not .getItem() both in condition and here?

    // Searching through sessionStorage for pages we have already saved, to show fast.
    storedPages = $filter('filter')( website.pages, function( page ) { return _checkIfStoredPageMatchAnyPath.call( this, page, paths ); } );
  }

  return storedPages;
}

/**
 * Helper function to _grepPagesfromStorage() - This function is run every time we find a page,
 * we then ask it, if it's link property is equal to any in our paths-array.
 * @return {Boolean}
 */
function _checkIfStoredPageMatchAnyPath( page, paths ) {
  var isMatch = false;

  for( var i = 0; i < paths.length; i++ ) {
    if( page.link === paths[i] ) {
      // If it is a match, we let the $filter plugin add it to the storedPages-array, by returning true.
      isMatch = true;
    }
  }

  return isMatch;
}

/**
 * Helper function for the filter in getWebsiteData() - We run through all pages from Storage, and only add a path, if it's not matched with any of the stored Pages.
 * so we know which we need to fetch from remote later on.
 * @return {Boolean}
 */
function _excludePathsFoundInStorage ( path, storedPages ) {
  var isMatch = true;

  for( var i = 0; i < storedPages.length; i++ ) {
    var pagePath = storedPages[i].link;

    if( path === pagePath ) {
      // If it is a match, DONT want to send it to the new Array.
      isMatch = false;
    }
  }
  return isMatch;
}

/**
 * We now have a URL with the pathnames of the pages that needs fetched from remote,
 * We simply need to fire it away and get a JSON response (When it is actually finished)
 * @return {Promise}
 */
function _fetchPagesFromRemote ( $q, $http, url ) {
  var dfrd = $q.defer();
  var config = {};

  if( typeof(Storage) !== 'undefined' && localStorage.getItem('authorization') !== null ) {
    config.headers['Authorization'] = localStorage.getItem('authorization');
  }

  var response = $http.get( url, config );

  response.success(function( response ) {
    dfrd.resolve( response );
  })

  response.error(function( response ) {
    alert('An error occured getting a response from remote servers');
    dfrd.resolve( response );
  });

  return dfrd.promise;
}

/**
 * When the pages have been fetched(callback) from remote, we merge the pages together with Storage,
 * and return the requested-pages, regardless of where they were fetched from.
 * @return {Object}   [ We return the whole website-object, as we would have gotten it fresh from the API. ]
 */
function _saveFetchedPagesToStorage( $filter, response, paths ) {
  var result = {};
  var local = {};

  // Merge the local and newly fetched website object.
  if( sessionStorage.getItem('website') !== null ) {
    local = JSON.parse( sessionStorage.getItem('website') );
    var remote = response;

    var pagesWithDuplicates = local.website.pages.concat( remote.website.pages );
    var pages = remove_duplicates(pagesWithDuplicates);

    // Get only the pages that was originally asked for, and save them to a new variable.
    // By checking if each page are in the paths-array we initially made.
    var requestedPages = $filter('filter')( pages, function( page ) { return (paths.indexOf( page.link ) > -1); } );

    // We just put all our newly fetched and already stored pages into a new Array called "pages",
    // But we only want to return the requested pages, but wrapped inside the website object. (e.g. { website: { ... pages: requestedPages } ...)
    result = remote;
    result.website.pages = requestedPages;

    // We will now put that new Array, containing all pages we have in total, into the local website variable,
    // so we can save the whole website to Storage later on.
    local.website.pages = pages;
  }
  else {
    // If this is the first request by the customer in this session, we simply just send him what we got.
    // There is nothing in sessionStorage just yet.
    result = response;
    local = response;
  }

  // Save it to sessionStorage, to use later.
  sessionStorage.setItem( 'website', angular.toJson( local ) );

  return result;
}

// http://stackoverflow.com/questions/26943242/remove-duplicate-objects-in-an-array-of-object-in-javascript
function remove_duplicates(objectsArray) {
  var usedObjects = {};

  for( var i = 0; i > objectsArray.length; i++ ) {
    var so = angular.toJson( objectsArray[i] );

    if ( usedObjects[so] )
      objectsArray.splice(i, 1);
    else
      usedObjects[so] = true;
  }

  return objectsArray;
}

function _findWebsiteHost() {
  var host = window.location.host;

  // If the host is the admin, then we need to find another way to figure out the real host.
  // This will be saved in localStorage, and updated everytime you switch project in the CMS.
  // TODO: Make a localStorage.setItem('host', [CLIENT-HOST]) in CMS when logging in and switching project.
  if( host == '127.0.0.1:8888' || host === 'localhost:8888' ) {
    if( typeof(Storage) !== 'undefined' && localStorage.getItem('host') !== null ) {
      host = localStorage.getItem('host');
    }
    else {
      alert('We couldn\'t figure out which website is attached to this CMS, either update your browser or logout and back in.');
    }
  }

  return host;
}