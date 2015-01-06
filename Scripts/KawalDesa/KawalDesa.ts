/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../gen/Models.ts"/>

module App {

    export var kawaldesa = angular.module('kawaldesa', [
        'angularFileUpload'
    ]);

    kawaldesa.run(['$location','$rootElement', function ($location, $rootElement) {
        $rootElement.off('click');
    }]);

    kawaldesa.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);
}