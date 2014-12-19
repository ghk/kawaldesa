/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>
var KawalDesa;
(function (KawalDesa) {
    KawalDesa.dashboard = angular.module('dashboard', [
        'ui.router',
        'scaffold',
        'angular-blocks',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap',
        'angular-loading-bar',
        'angularFileUpload'
    ]);

    KawalDesa.dashboard.run([
        '$location', '$rootElement', function ($location, $rootElement) {
            $rootElement.off('click');
        }]);

    KawalDesa.dashboard.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        var baseUrl = "/";

        //$urlRouterProvider.otherwise(baseUrl);
        $stateProvider.state('site', {
            abstract: true,
            template: '<ui-view></ui-view>',
            resolve: {
                authorize: [
                    'authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            }
        }).state('dashboard', {
            parent: 'site',
            url: '/dashboard/',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/Index',
            controller: 'IndexCtrl as indexCtrl'
        }).state('login', {
            parent: 'site',
            url: '/dashboard/login',
            data: {
                roles: []
            },
            templateUrl: baseUrl + 'partials/Login',
            controller: 'LoginCtrl as loginCtrl'
        }).state('dashboard.region', {
            url: '/region',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/table/Region',
            controller: 'RegionCtrl as CRUDCtrl'
        }).state('dashboard.transaction', {
            url: '/transaction',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/table/Transaction',
            controller: 'TransactionCtrl as CRUDCtrl'
        }).state('dashboard.user', {
            url: '/user',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/table/User',
            controller: 'UserCtrl as CRUDCtrl'
        }).state('accessdenied', {
            url: '/denied',
            data: {
                roles: []
            },
            templateUrl: baseUrl + 'partials/AccessDenied'
        });

        $locationProvider.html5Mode(true);
    });
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=Dashboard.js.map
