/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var Models = App.Models;

        function safeApply(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        }

        var IndexCtrl = (function () {
            function IndexCtrl($scope, principal) {
                this.$scope = $scope;
                this.principal = principal;
                $scope.principal = principal;
                principal.identity().then(function (identity) {
                    $scope.user = new Models.User(identity.user);
                });

                if (principal.isInRole("admin")) {
                    Models.APBN.GetAll().done(function (apbns) {
                        safeApply($scope, function () {
                            $scope.apbns = apbns;
                        });
                    });
                    Models.APBDFile.GetAll().done(function (apbdFiles) {
                        safeApply($scope, function () {
                            $scope.apbdFiles = apbdFiles;
                        });
                    });
                    Models.TransactionFile.GetAll().done(function (transactionFiles) {
                        safeApply($scope, function () {
                            $scope.transactionFiles = transactionFiles;
                        });
                    });
                }
            }
            return IndexCtrl;
        })();
        KawalDesa.dashboard.controller("IndexCtrl", ["$scope", "principal", IndexCtrl]);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=IndexCtrl.js.map
