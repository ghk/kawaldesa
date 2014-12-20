/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;

    var CHILD_NAMES = [
        "Daerah",
        "Provinsi",
        "Kabupaten / Kota",
        "Kecamatan",
        "Desa"
    ];


    class RecapitulationCtrl {

        static $inject = ["$scope", "$location"];

        expandedStates = {};
        transactions = {};

        constructor(public $scope, public $location) {
            var ctrl = this;

            var regionID = parseInt(this.$location.path().replace("/r/", ""));   
            
            $scope.$on('$locationChangeSuccess', function () {
                ctrl.changeRecapitulations();
            });
            ctrl.changeRecapitulations();
        }

        changeRecapitulations() {
            var regionID = parseInt(this.$location.path().replace("/r/", ""));
            if (isNaN(regionID))
                regionID = 0;

            this.getRecapitulations(regionID);
        }

        activate(regionType, entityID, ev) {
            ev.preventDefault();
            var ctrl = this;

            if (regionType < 3) {
                this.$location.path("/r/" + entityID);
            }
            else {
                this.expandedStates[entityID] = !this.expandedStates[entityID];
                if (this.expandedStates[entityID]) {
                    Models.Transaction.GetTransactionDetails(entityID).done(details => {
                        ctrl.$scope.$apply(() => {
                            ctrl.transactions[entityID] = details;
                        });
                    });
                }
            }
        }

        isExpanded(entity) {
            return this.expandedStates[entity.RegionID];
        }

        getRecapitulations(parentID: number) {
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
            }
            Models.Recapitulation.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionID != parentID);
                    scope.total = recapitulations.filter(r => r.RegionID == parentID)[0];
                });
            });

            Models.Region.Get(parentID).done(region => {
                scope.$apply(() => {
                    scope.region = region;
                    var regionTree = [];
                    var cur : Models.IRegion = region;
                    while (cur) {
                        regionTree.push(cur);
                        cur = cur.Parent;
                    }
                    scope.regionTree = regionTree.reverse();
                    if (regionTree.length < CHILD_NAMES.length)
                        scope.childName = CHILD_NAMES[regionTree.length];
                });
            });
        }

    }

    kawaldesa.controller("RecapitulationCtrl", RecapitulationCtrl);
}