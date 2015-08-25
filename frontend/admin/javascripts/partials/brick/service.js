angular.module('brick').factory( 'Brick', [ '$http', '$q', '$filter', function( $http, $q, $filter ) {
  return {
    get: function( paths ) {
      return getBricksData.call( this, paths, $http, $q, $filter );
    }
  };
} ] );

function getBricksData( paths, $http, $q, $filter ) {
  var dfrd = $q.defer();
  var config = {};

  if( typeof(Storage) !== 'undefined' && localStorage.getItem('authorization') !== null ) {
    config.headers['Authorization'] = localStorage.getItem('authorization');
  }

  var host = _findWebsiteHost();
  var url = 'http://127.0.0.1:5000/website/' + host + '/bricks.json'; // http://api.cms.dk/website/www.example.com/bricks.json

  var response = $http.get( url, config );

  response.success(function( data ) {
    if( sessionStorage.getItem( 'bricks' ) == null ) {
      sessionStorage.setItem( 'bricks', angular.toJson( data ) );
      dfrd.resolve( data );
    }
    else {
      dfrd.resolve( JSON.parse( sessionStorage.getItem( 'bricks' ) ) );
    }
  });

  response.error(function( data ) {
    alert('An error occured getting a response from remote servers');
    dfrd.resolve( data );
  });

  return dfrd.promise;
}