/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;


    class RecapitulationCtrl {

        static $inject = ["$scope", "$location"];

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

        setParentID(parentID: number, ev) {
            this.$location.path("/r/" + parentID);
            this.$location.replace();
            ev.preventDefault();
        }

        getRecapitulations(parentID: number) {
            this.$scope.entities = [];
            
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
        }

    }

    kawaldesa.controller("RecapitulationCtrl", RecapitulationCtrl);
}