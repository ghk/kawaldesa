/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>
var KawalDesa;
(function (KawalDesa) {
    KawalDesa.kawaldesa = angular.module('kawaldesa', [
        'ui.router',
        'scaffold',
        'angular-blocks',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap',
        'angular-loading-bar'
    ]);

    KawalDesa.kawaldesa.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
        }).state('index', {
            url: '/',
            templateUrl: baseUrl + 'partials/ViewData/NationalSite',
            controller: 'NationalRegionCtrl as CRUDCtrl'
        }).state('province', {
            url: '/province/:ProvinceID',
            templateUrl: baseUrl + 'partials/ViewData/ProvinceSite',
            controller: 'NationalRegionCtrl as CRUDCtrl'
        }).state('district', {
            url: '/district/:ProvinceID',
            templateUrl: baseUrl + 'partials/ViewData/DistrictSite',
            controller: 'NationalRegionCtrl as CRUDCtrl'
        }).state('login', {
            parent: 'site',
            url: '/login',
            data: {
                roles: []
            },
            templateUrl: baseUrl + 'partials/Login',
            controller: 'LoginCtrl as loginCtrl'
        }).state('dashboard', {
            parent: 'site',
            url: '/dashboard',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/Index',
            controller: 'IndexCtrl as indexCtrl'
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
//# sourceMappingURL=KawalDesa.js.map
