/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Dashboard.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;

    class IndexCtrl {
        constructor(public $scope, public principal) {
            $scope.principal = principal;
        }
    }
    dashboard.controller("IndexCtrl", ["$scope", "principal", IndexCtrl]);
}
