/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>
var KawalDesa;
(function (KawalDesa) {
    KawalDesa.dashboard = angular.module('dashboard', [
        'angular-loading-bar'
    ]);

    KawalDesa.dashboard.run([
        '$location', '$rootElement', function ($location, $rootElement) {
            $rootElement.off('click');
        }]);

    KawalDesa.dashboard.config([
        '$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }]);
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=Dashboard.js.map
