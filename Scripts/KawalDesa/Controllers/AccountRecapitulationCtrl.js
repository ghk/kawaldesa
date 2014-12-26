/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>
var App;
(function (App) {
    (function (Controllers) {
        var Models = App.Models;

        var AccountRecapitulationCtrl = (function () {
            function AccountRecapitulationCtrl($scope, $upload) {
                this.$scope = $scope;
                this.$upload = $upload;
                var ctrl = this;
                this.indexCtrl = this.$scope.indexCtrl;

                $scope.$on('regionChangeSuccess', function () {
                    ctrl.onRegionChanged();
                });
            }
            AccountRecapitulationCtrl.prototype.onRegionChanged = function () {
                if (this.indexCtrl.type == "realization") {
                    this.getRecapitulations(this.indexCtrl.region.ID);
                }
            };

            AccountRecapitulationCtrl.prototype.getRecapitulations = function (parentID) {
                var ctrl = this;
                var scope = this.$scope;
                var query = {
                    "SortOrder": "ASC",
                    "ParentID": parentID
                };
                var type = Models.FrozenAccountRecapitulation;
                if (this.indexCtrl.currentUser) {
                    type = Models.AccountRecapitulation;
                }
                type.GetAll(query).done(function (recapitulations) {
                    scope.$apply(function () {
                        scope.entities = recapitulations.filter(function (r) {
                            return r.RegionID != parentID;
                        });
                        scope.total = recapitulations.filter(function (r) {
                            return r.RegionID == parentID;
                        })[0];
                    });
                });
            };
            AccountRecapitulationCtrl.$inject = ["$scope", "$upload"];
            return AccountRecapitulationCtrl;
        })();

        App.kawaldesa.controller("AccountRecapitulationCtrl", AccountRecapitulationCtrl);
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=AccountRecapitulationCtrl.js.map
