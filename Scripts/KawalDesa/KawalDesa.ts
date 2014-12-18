/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Models.ts"/>

module KawalDesa {

    export var kawaldesa = angular.module('kawaldesa', [
    ]);

    kawaldesa.run(['$location', '$rootElement', function ($location, $rootElement) {
        $rootElement.off('click');
    }]);

    kawaldesa.config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);


}