/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../gen/Models.ts"/>

module App {

    export var kawaldesa = angular.module('kawaldesa', [
        'angularFileUpload',
        'ui.bootstrap.typeahead',
        'ui.bootstrap.position',
        'ui.bootstrap.modal',
        'ui.bootstrap.datepicker',
        'ng-inputdecimalseparator',
        'chart.js',
    ]);

    kawaldesa.run(['$location', '$rootElement', '$http', function ($location, $rootElement, $http) {        
        Microvac.Web.$http = $http;
        $rootElement.off('click');
    }]);

    kawaldesa.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $locationProvider.hashPrefix('!');
    }]);

    kawaldesa.directive('convertToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel: any) {
                ngModel.$parsers.push(function (val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    return '' + val;
                });
            }
        };
    });

    $(function () {
        $(".navbar-header").delegate(".navbar-toggle", "click", function (e) {
            e.preventDefault();
            $(".navbar-collapse").toggleClass("collapse");
        });
    });

}