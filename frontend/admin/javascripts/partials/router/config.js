app.config( [ '$routeProvider', '$locationProvider', routerConfig ] );

function routerConfig ( $routeProvider, $locationProvider ) {
  var router = $routeProvider;

  $locationProvider.html5Mode( true );

  /////////////////////
  ///// FRONTPAGE /////
  /////////////////////

  router.when('/', {
    templateUrl : '/javascripts/partials/dashboard/templates/dashboard.html',
    controller : 'dashboardCtrl'
  });


  /////////////////
  ///// PAGES /////
  /////////////////

  router.when('/pages', {
    templateUrl : '/javascripts/partials/page/templates/pages.html',
    controller : 'pageStructureCtrl'
  });

  router.when('/page', {
    templateUrl : '/javascripts/partials/page/templates/page.html',
    controller : 'pageDesignerCtrl'
  });

  router.when('/page/:id', {
    templateUrl : '/javascripts/partials/page/templates/page.html',
    controller : 'pageDesignerCtrl'
  });


  //////////////////
  ///// BRICKS /////
  //////////////////

  router.when('/bricks', {
    templateUrl : '/javascripts/partials/brick/templates/bricks.html',
    controller : 'brickStructureCtrl'
  });

  router.when('/brick', {
    templateUrl : '/javascripts/partials/brick/templates/brick.html',
    controller : 'brickDesignerCtrl'
  });

  router.when('/brick/:id', {
    templateUrl : '/javascripts/partials/brick/templates/brick.html',
    controller : 'brickDesignerCtrl'
  });


  ////////////////////
  ///// SETTINGS /////
  ////////////////////

  router.when('/settings', {
    templateUrl : '/javascripts/partials/settings/templates/settings.html',
    controller : 'settingsCtrl'
  });


  /////////////////////
  ///// NOT FOUND /////
  /////////////////////

  router.otherwise({
    redirectTo: '/'
  });
}