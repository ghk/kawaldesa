/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>
var App;
(function (App) {
    (function (Controllers) {
        var Models = App.Models;

        var APBDesCtrl = (function () {
            function APBDesCtrl($scope, $upload) {
                this.$scope = $scope;
                this.$upload = $upload;
                var ctrl = this;
                this.indexCtrl = this.$scope.indexCtrl;

                $scope.$on('regionChangeSuccess', function () {
                    ctrl.onRegionChanged();
                });
            }
            APBDesCtrl.prototype.onRegionChanged = function () {
                if (this.indexCtrl.region.Type == 4) {
                    this.getAPBDes(this.indexCtrl.region.ID);
                }
            };

            APBDesCtrl.prototype.getAPBDes = function (regionID) {
                var ctrl = this;
                var scope = this.$scope;
                Models.APBDes.GetByRegionID(regionID).done(function (apbdes) {
                    ctrl.$scope.$apply(function () {
                        ctrl.apbdes = apbdes;
                        ctrl.rootAccounts = apbdes.Accounts.filter(function (a) {
                            return a.fkParentAccountID == null;
                        });
                        ctrl.rootAccounts.sort(function (a, b) {
                            return a.Type - b.Type;
                        });
                        for (var i = 0; i < ctrl.rootAccounts.length; i++) {
                            var root = ctrl.rootAccounts[i];
                            root.ChildAccounts = apbdes.Accounts.filter(function (a) {
                                return a.Type == root.Type && a.fkParentAccountID != null;
                            });
                            root.ChildAccounts.sort(function (a, b) {
                                return a.Code.localeCompare(b.Code);
                            });
                        }
                    });
                });
            };
            APBDesCtrl.$inject = ["$scope", "$upload"];
            return APBDesCtrl;
        })();

        App.kawaldesa.controller("APBDesCtrl", APBDesCtrl);
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=APBDesCtrl.js.map
