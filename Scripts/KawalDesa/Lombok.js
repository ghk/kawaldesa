/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>
var Lombok;
(function (Lombok) {
    Lombok.lombok = angular.module('lombok', [
        'ui.router',
        'scaffold',
        'angular-blocks',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap',
        'angular-loading-bar'
    ]);

    Lombok.lombok.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
            url: baseUrl,
            data: {
                roles: ['viewer', 'clinicviewer', 'clinicadmin', 'admin']
            },
            templateUrl: baseUrl + 'partials/Index',
            controller: 'IndexCtrl as indexCtrl'
        }).state('dashboard.workforce', {
            url: 'workforce',
            data: {
                roles: ['viewer', 'clinicviewer', 'clinicadmin', 'admin']
            },
            templateUrl: baseUrl + 'partials/table/Workforce',
            controller: 'WorkforceCtrl as CRUDCtrl'
        }).state('dashboard.clinic', {
            url: 'clinic',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/table/Clinic',
            controller: 'ClinicCtrl as CRUDCtrl'
        }).state('dashboard.credit', {
            url: 'credit',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/table/Credit',
            controller: 'CreditCtrl as CRUDCtrl'
        }).state('dashboard.user', {
            url: 'user',
            data: {
                roles: ['admin']
            },
            templateUrl: baseUrl + 'partials/table/User',
            controller: 'UserCtrl as CRUDCtrl'
        }).state('accessdenied', {
            url: 'denied',
            data: {
                roles: []
            },
            templateUrl: baseUrl + 'partials/AccessDenied'
        });

        $locationProvider.html5Mode(true);
    });
})(Lombok || (Lombok = {}));
//# sourceMappingURL=Lombok.js.map
