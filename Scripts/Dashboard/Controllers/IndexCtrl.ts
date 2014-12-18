/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class IndexCtrl {
        constructor(public $scope, public principal: IPrincipal) {
            $scope.principal = principal;
            principal.identity().then(function (identity) {
                 $scope.user = new Models.User(identity.user);
            });

            if (principal.isInRole("admin")) {
                Models.APBN.GetAll().done(apbns => {
                    safeApply($scope, () => {
                        $scope.apbns = apbns;
                    });
                });
                Models.APBDFile.GetAll().done(apbdFiles => {
                    safeApply($scope, () => {
                        $scope.apbdFiles = apbdFiles;
                    });
                });
                Models.TransactionFile.GetAll().done(transactionFiles => {
                    safeApply($scope, () => {
                        $scope.transactionFiles = transactionFiles;
                    });
                });
            }
            
        }
    }
    dashboard.controller("IndexCtrl", ["$scope", "principal", IndexCtrl]);
}
