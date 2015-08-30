angular.module('page').controller( 'brickStructureCtrl', [ '$scope', 'Brick', brickStructureCtrl ] );
angular.module('page').controller( 'brickDesignerCtrl', [ '$scope', '$routeParams', '$filter', 'Brick', brickDesignerCtrl ] );
angular.module('page').controller( 'brickSelectCtrl', [ '$scope', 'bricks', 'deferred', 'close', brickSelectCtrl ] );


function brickStructureCtrl ( $scope, Brick ) {
  Brick.get().then(function( data ) {
    if( typeof(data) == 'object' && data.hasOwnProperty('bricks') ) {
      $scope.bricks = data.bricks;
    }
  });
}

function brickDesignerCtrl ( $scope, $routeParams, $filter, Brick) {
  Brick.get().then(function( data ) {
    if( typeof(data) == 'object' && data.hasOwnProperty('bricks') ) {
      var brickId = $routeParams.id;

      if( brickId == undefined ) {
        $scope.brick = { id: -1, properties: {} };
      }
      else {
        var bricks = $filter('filter')( data.bricks.created, function( brick ) { return brick.id == brickId; } );
        if( bricks.length > 0 ) {
          $scope.brick = bricks[0];
        }
        else {
          alert('No brick with ID (' + brickId + ')');
        }
      }

      $scope.onNewPropertyClicked = function() {
        addNewProperty.call( this, $scope );
      };

      $scope.onPropertyNameKeyup = function() {
        propertyNameKeyup.call( this, $scope );
      }

      $scope.onBrickSaveClicked = function() {
        brickSaved.call( this, $scope );
      }
    }
  });
}

function brickSelectCtrl ( $scope, bricks, deferred, close ) {
  $scope.bricks = bricks;

  var obj = {
    deferred: deferred
  };

  $scope.onItemSelected = function( brick ) {
    obj['brick'] = brick;
    close( obj );
  };
}


////////////////////
///// PARTIALS /////
////////////////////

function addNewProperty( $scope ) {
  $scope.brick.properties['untitled' + new Date().getTime()] = { id: -1, name: '', slug: '', type: '' };
}

function propertyNameKeyup( $scope ) {
  this.property.slug = this.property.name.replace(/ /g,'-').replace(/[^a-zA-Z0-9 ]/g, '');
}

function brickSaved( $scope ) {
  var bricks = JSON.parse( sessionStorage.getItem('bricks') ).bricks;
  var brick = $scope.brick;

  if( brick.id == -1 ) {
    bricks.created.push( brick );
  }
  else {
    var index = bricks.created.map(function( brick ) { return brick.id; }).indexOf( brick.id );
    bricks.created[index] = brick;
  }

  var result = { bricks: bricks };
  sessionStorage.setItem( 'bricks', angular.toJson( result ) );
}