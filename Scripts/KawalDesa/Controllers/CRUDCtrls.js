/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var Models = App.Models;

        var CHILD_NAMES = [
            "Daerah",
            "Provinsi",
            "Kabupaten / Kota",
            "Kecamatan",
            "Desa"
        ];

        var RecapitulationCtrl = (function () {
            function RecapitulationCtrl($scope, $location) {
                this.$scope = $scope;
                this.$location = $location;
                this.expandedStates = {};
                this.transactions = {};
                var ctrl = this;

                var regionID = parseInt(this.$location.path().replace("/r/", ""));

                $scope.$on('$locationChangeSuccess', function () {
                    ctrl.changeRecapitulations();
                });
                ctrl.changeRecapitulations();
            }
            RecapitulationCtrl.prototype.changeRecapitulations = function () {
                var regionID = parseInt(this.$location.path().replace("/r/", ""));
                if (isNaN(regionID))
                    regionID = 0;

                this.getRecapitulations(regionID);
            };

            RecapitulationCtrl.prototype.activate = function (regionType, entityID, ev) {
                var ctrl = this;

                ev.preventDefault();
                if (regionType < 3) {
                    this.$location.path("/r/" + entityID);
                    this.$location.replace();
                } else {
                    this.expandedStates[entityID] = !this.expandedStates[entityID];
                    if (this.expandedStates[entityID]) {
                        Models.Transaction.GetTransactionDetails(entityID).done(function (details) {
                            ctrl.$scope.$apply(function () {
                                ctrl.transactions[entityID] = details;
                            });
                        });
                    }
                }
            };

            RecapitulationCtrl.prototype.isExpanded = function (entity) {
                return this.expandedStates[entity.RegionID];
            };

            RecapitulationCtrl.prototype.getRecapitulations = function (parentID) {
                this.$scope.entities = [];
                this.$scope.regionTree = [];
                this.$scope.childName = CHILD_NAMES[0];
                this.expandedStates = {};
                this.transactions = {};

                var ctrl = this;
                var scope = this.$scope;
                var query = {
                    "SortOrder": "ASC",
                    "ParentID": parentID
                };
                Models.Recapitulation.GetAll(query).done(function (recapitulations) {
                    scope.$apply(function () {
                        scope.entities = recapitulations.filter(function (r) {
                            return r.RegionID != parentID;
                        });
                        scope.total = recapitulations.filter(function (r) {
                            return r.RegionID == parentID;
                        })[0];
                    });
                });

                Models.Region.Get(parentID).done(function (region) {
                    scope.$apply(function () {
                        scope.region = region;
                        var regionTree = [];
                        var cur = region;
                        while (cur) {
                            regionTree.push(cur);
                            cur = cur.Parent;
                        }
                        scope.regionTree = regionTree.reverse();
                        if (regionTree.length < CHILD_NAMES.length)
                            scope.childName = CHILD_NAMES[regionTree.length];
                    });
                });
            };
            RecapitulationCtrl.$inject = ["$scope", "$location"];
            return RecapitulationCtrl;
        })();

        KawalDesa.kawaldesa.controller("RecapitulationCtrl", RecapitulationCtrl);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=CRUDCtrls.js.map
