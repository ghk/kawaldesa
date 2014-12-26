/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>
var App;
(function (App) {
    App.kawaldesa = angular.module('kawaldesa', [
        'angularFileUpload'
    ]);

    App.kawaldesa.run([
        '$location', '$rootElement', function ($location, $rootElement) {
            $rootElement.off('click');
        }]);

    App.kawaldesa.config([
        '$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }]);
})(App || (App = {}));
//# sourceMappingURL=KawalDesa.js.map
