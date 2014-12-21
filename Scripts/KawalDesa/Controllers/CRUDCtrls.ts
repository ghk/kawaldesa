/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>


module KawalDesa.Controllers {

    interface MyWindow extends Window {
        CurrentUserRoles: string[];
    }

    declare var window: MyWindow;

    import Models = App.Models;

    var CHILD_NAMES = [
        "Daerah",
        "Provinsi",
        "Kabupaten / Kota",
        "Kecamatan",
        "Desa"
    ];


    class RecapitulationCtrl {

        static $inject = ["$scope", "$upload", "$location"];

        expandedStates = {};
        formTransactions = {};
        transactions = {};

        constructor(public $scope, public $upload, public $location) {
            var ctrl = this;

            var regionID = parseInt(this.$location.path().replace("/r/", ""));   
            
            $scope.$on('$locationChangeSuccess', function () {
                ctrl.changeRecapitulations();
            });
        }

        changeRecapitulations() {
            var regionID = parseInt(this.$location.path().replace("/r/", ""));
            if (isNaN(regionID))
                regionID = 0;

            this.loadRegion(regionID);
        }

        activate(regionType, entityID, ev) {
            ev.preventDefault();
            var ctrl = this;

            if (regionType < 3) {
                this.$location.path("/r/" + entityID);
            }
            else {
                this.expandedStates[entityID] = !this.expandedStates[entityID];
                this.loadTransactions(entityID);
            }
        }

        isExpanded(entity) {
            return this.expandedStates[entity.RegionID];
        }

        setFormExpanded(entity, state) {
            if (state) {
                this.formTransactions[entity.RegionID] = {
                    fkSourceID: state[0],
                    fkDestinationID: state[1],
                    fkActorID: state[2]
                }
            } else {
                delete this.formTransactions[entity.RegionID];
            }
        }

        isFormExpanded(entity) {
            return this.formTransactions[entity.RegionID];
        }

        saveForm(entity) {
            var ctrl = this;
            this.$upload.upload({
                type: 'POST',
                url: '/api/Transaction/AddTransaction',
                data: this.formTransactions[entity.RegionID],
                file: this.formTransactions[entity.RegionID].File
            }).success(() => {
                ctrl.setFormExpanded(entity, null);
                ctrl.getRecapitulations(entity.ParentRegionID);
                ctrl.loadTransactions(entity.RegionID);
            });
        }

        hasAnyVolunteerRoles() {
            return window.CurrentUserRoles.some(r => r.indexOf("volunteer_") != -1);
        }

        isInRole(roleName) {
            if (!window.CurrentUserRoles) {
                return false;
            }
            return window.CurrentUserRoles.some(r => roleName == r);
        }

        loadRegion(parentID: number) {
            this.$scope.entities = [];
            this.$scope.regionTree = [];
            this.$scope.childName = CHILD_NAMES[0];
            
            var ctrl = this;
            var scope = this.$scope;

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
                    ctrl.expandedStates = {};
                    ctrl.formTransactions = {};
                    ctrl.transactions = {};
                    ctrl.getRecapitulations(parentID);
                });
            });
        }

        getRecapitulations(parentID: number) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentID": parentID
            }
            var type = Models.Recapitulation;
            if (window.CurrentUserRoles) {
                type = Models.LiveRecapitulation;
            }
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionID != parentID);
                    scope.total = recapitulations.filter(r => r.RegionID == parentID)[0];
                });
            });
        }

        loadTransactions(entityID) {
            var ctrl = this;
            if (this.expandedStates[entityID]) {
                Models.Transaction.GetTransactionDetails(entityID).done(details => {
                    ctrl.$scope.$apply(() => {
                        ctrl.transactions[entityID] = details;
                    });
                });
            }
        }

    }

    kawaldesa.controller("RecapitulationCtrl", RecapitulationCtrl);
}