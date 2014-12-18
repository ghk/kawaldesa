/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>
var KawalDesa;
(function (KawalDesa) {
    KawalDesa.kawaldesa = angular.module('kawaldesa', []);

    KawalDesa.kawaldesa.run([
        '$location', '$rootElement', function ($location, $rootElement) {
            $rootElement.off('click');
        }]);

    KawalDesa.kawaldesa.config([
        '$locationProvider',
        function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }]);
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=KawalDesa.js.map
