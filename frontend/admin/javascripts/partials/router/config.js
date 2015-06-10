app.config( [ '$routeProvider', '$locationProvider', routerConfig ] );

function routerConfig ( $routeProvider, $locationProvider ) {
  var router = $routeProvider;

  $locationProvider.html5Mode( true );

  router.when('/', {
    templateUrl : '/javascripts/partials/dashboard/templates/dashboard.html',
    controller : 'dashboardCtrl'
  });

  router.when('/pages', {
    templateUrl : '/javascripts/partials/page/templates/pages.html',
    controller : 'pageStructureCtrl'
  });

  router.when('/page/:id', {
    templateUrl : '/javascripts/partials/page/templates/page.html',
    controller : 'pageDesignerCtrl'
  });

  router.when('/settings', {
    templateUrl : '/javascripts/partials/settings/templates/settings.html',
    controller : 'settingsCtrl'
  });

  router.otherwise({
    redirectTo: '/'
  });
}