/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
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
            function RecapitulationCtrl($scope, $upload, $location) {
                this.$scope = $scope;
                this.$upload = $upload;
                this.$location = $location;
                this.expandedStates = {};
                this.formTransactions = {};
                this.transactions = {};
                var ctrl = this;

                var regionID = parseInt(this.$location.path().replace("/r/", ""));

                $scope.$on('$locationChangeSuccess', function () {
                    ctrl.changeRecapitulations();
                });
            }
            RecapitulationCtrl.prototype.changeRecapitulations = function () {
                var regionID = parseInt(this.$location.path().replace("/r/", ""));
                if (isNaN(regionID))
                    regionID = 0;

                this.loadRegion(regionID);
            };

            RecapitulationCtrl.prototype.activate = function (regionType, entityID, ev) {
                ev.preventDefault();
                var ctrl = this;

                if (regionType < 3) {
                    this.$location.path("/r/" + entityID);
                } else {
                    this.expandedStates[entityID] = !this.expandedStates[entityID];
                    this.loadTransactions(entityID);
                }
            };

            RecapitulationCtrl.prototype.isExpanded = function (entity) {
                return this.expandedStates[entity.RegionID];
            };

            RecapitulationCtrl.prototype.setFormExpanded = function (entity, state) {
                if (state) {
                    this.formTransactions[entity.RegionID] = {
                        fkSourceID: state[0],
                        fkDestinationID: state[1],
                        fkActorID: state[2]
                    };
                } else {
                    delete this.formTransactions[entity.RegionID];
                }
            };

            RecapitulationCtrl.prototype.isFormExpanded = function (entity) {
                return this.formTransactions[entity.RegionID];
            };

            RecapitulationCtrl.prototype.saveForm = function (entity) {
                var ctrl = this;
                this.$upload.upload({
                    type: 'POST',
                    url: '/api/Transaction/AddTransaction',
                    data: this.formTransactions[entity.RegionID],
                    file: this.formTransactions[entity.RegionID].File
                }).success(function () {
                    ctrl.setFormExpanded(entity, null);
                    ctrl.getRecapitulations(entity.ParentRegionID);
                    ctrl.loadTransactions(entity.RegionID);
                });
            };

            RecapitulationCtrl.prototype.hasAnyVolunteerRoles = function () {
                return window.CurrentUserRoles.some(function (r) {
                    return r.indexOf("volunteer_") != -1;
                });
            };

            RecapitulationCtrl.prototype.isInRole = function (roleName) {
                if (!window.CurrentUserRoles) {
                    return false;
                }
                return window.CurrentUserRoles.some(function (r) {
                    return roleName == r;
                });
            };

            RecapitulationCtrl.prototype.loadRegion = function (parentID) {
                this.$scope.entities = [];
                this.$scope.regionTree = [];
                this.$scope.childName = CHILD_NAMES[0];

                var ctrl = this;
                var scope = this.$scope;

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
                        ctrl.expandedStates = {};
                        ctrl.formTransactions = {};
                        ctrl.transactions = {};
                        ctrl.getRecapitulations(parentID);
                    });
                });
            };

            RecapitulationCtrl.prototype.getRecapitulations = function (parentID) {
                var ctrl = this;
                var scope = this.$scope;
                var query = {
                    "SortOrder": "ASC",
                    "ParentID": parentID
                };
                var type = Models.Recapitulation;
                if (window.CurrentUserRoles) {
                    type = Models.LiveRecapitulation;
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

            RecapitulationCtrl.prototype.loadTransactions = function (entityID) {
                var ctrl = this;
                if (this.expandedStates[entityID]) {
                    Models.Transaction.GetTransactionDetails(entityID).done(function (details) {
                        ctrl.$scope.$apply(function () {
                            ctrl.transactions[entityID] = details;
                        });
                    });
                }
            };
            RecapitulationCtrl.$inject = ["$scope", "$upload", "$location"];
            return RecapitulationCtrl;
        })();

        KawalDesa.kawaldesa.controller("RecapitulationCtrl", RecapitulationCtrl);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=CRUDCtrls.js.map
