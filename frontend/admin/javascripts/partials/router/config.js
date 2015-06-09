scotchApp.config(function($routeProvider) {
  var router = $routeProvider;

  router.when('/', {
    templateUrl : 'partials/dashboard/templates/dashboard.html',
    controller  : 'dashboardCtrl'
  });

  router.when('/pages', {
    templateUrl : 'partials/page/templates/pages.html',
    controller  : 'pageStructureCtrl'
  });

  router.when('/page/:id', {
    templateUrl : 'partials/page/templates/page.html',
    controller  : 'pageDesignerCtrl'
  });

  router.when('/settings', {
    templateUrl : 'partials/settings/templates/settings.html',
    controller  : 'settingsCtrl'
  });
});