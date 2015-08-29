/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../gen/Models.ts"/>

module App {

    export var kawaldesa = angular.module('kawaldesa', [
        'angularFileUpload',
        'ui.bootstrap.typeahead',
        'ui.bootstrap.position',
        'ui.bootstrap.modal',
        'turn/stickyTableHeader'
    ]);

    kawaldesa.run(['$location', '$rootElement', '$http', function ($location, $rootElement, $http) {        
        Scaffold.$http = $http;
        $rootElement.off('click');
    }]);

    kawaldesa.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $locationProvider.hashPrefix('!');
    }]);
}