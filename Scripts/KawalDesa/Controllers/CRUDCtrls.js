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

            RecapitulationCtrl.prototype.setParentID = function (parentID, ev) {
                this.$location.path("/r/" + parentID);
                this.$location.replace();
                ev.preventDefault();
            };

            RecapitulationCtrl.prototype.getRecapitulations = function (parentID) {
                this.$scope.entities = [];
                this.$scope.regionTree = [];
                this.$scope.childName = CHILD_NAMES[0];

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
