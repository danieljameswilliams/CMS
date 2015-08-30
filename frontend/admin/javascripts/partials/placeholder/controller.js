angular.module('placeholder').controller( 'placeholderCtrlAdmin', [ '$scope', '$rootScope', '$controller', '$q', '$filter', '$element', '$compile', '$attrs', 'Website', 'ModalService', placeholderCtrlAdmin ] );

function placeholderCtrlAdmin($scope, $rootScope, $controller, $q, $filter, $element, $compile, $attrs, Website, ModalService) {
  // Initialize the super class and extend it.
  angular.extend(this, $controller( 'placeholderCtrl', { $scope: $scope, $rootScope: $rootScope, $filter: $filter, $element: $element, $compile: $compile, $attrs: $attrs, Website: Website } ));

  $scope.onAddNewBlockButtonClick = function() {
    return addNewBlock.call( this, $scope, $q );
  };

  $scope.onAddNewBrickButtonClick = function() {
    return addNewBrick.call( this, $scope, $q, ModalService );
  };
}

////////////////////
///// PARTIALS /////
////////////////////

function addNewBlock( $scope, $q ) {
  var placeholder = this.placeholder;
  var placeholderIndex = $scope.pageContent.placeholders.indexOf(placeholder);
  var blocks = $scope.pageContent.placeholders[placeholderIndex].blocks;

  var dfrd = $q.defer();
  var popup = showBlockNamingPopup(this, $q);

  popup.then(function( responseName ) {
    blocks.push({ bricks: [], id: -1, name: responseName, order: blocks.length });
    dfrd.resolve( responseName );
  });

  popup.catch(function( response ) {
    alert('Your block creation was cancelled.');
    dfrd.resolve( response );
  });

  return dfrd.promise;
}

function addNewBrick( $scope, $q, ModalService ) {
  var placeholder = this.$parent.placeholder;
  var block = this.block;

  if( block == undefined ) {
    // This means that the brick has been created in an unsaved block.
    console.log('TODO: Adding brick to new block.');
  }
  else {
    var placeholderIndex = $scope.pageContent.placeholders.indexOf( placeholder );
    var blockIndex = $scope.pageContent.placeholders[placeholderIndex].blocks.indexOf( block );
    var deferred = $q.defer();

    console.log('TODO: Adding brick to existing block.');
    var popup = showBrickTemplateSelectorPopup( deferred, ModalService );

    popup.then(function( brick ) {
      console.log('User selected a brick template to use');
      $scope.pageContent.placeholders[placeholderIndex].blocks[blockIndex].bricks.push( brick );
    });

    popup.catch(function( message ) {
      alert( message );
    });
  }
}


////////////////////
///// PARTIALS /////
////////////////////

function showBlockNamingPopup(pageContent, $q) {
  var prompt = window.prompt('Give the container a name', '');

  return $q(function(resolve, reject) {
    if( prompt != null ) {
      resolve(prompt);
    } else {
      reject(prompt);
    }
  });
}

function showBrickTemplateSelectorPopup( deferred, ModalService ) {
  var bricks = JSON.parse( sessionStorage.getItem('bricks') ).bricks;
  var templates = [];

  // Merging all brick-templates to one array without categories around.
  // This is done to count the total bricks available for the client.
  for( var property in bricks ) {
    for( var i = 0; i < bricks[property].length; i++ ) {
      var brick = bricks[property][i];
      templates.push(brick);
    }
  }

  ModalService.showModal({
    templateUrl: "/javascripts/partials/brick/templates/brick_select.html",
    controller: "brickSelectCtrl",
    inputs: {
      bricks: bricks,
      deferred: deferred
    }
  }).then(function( modal ) {
    modal.close.then(function( result ) {
      result.deferred.resolve( result.brick );
    });
  });

  return deferred.promise;
}