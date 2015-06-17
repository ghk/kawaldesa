/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class AccountRecapitulationCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;

        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
            $scope.$on('regionChangeBefore', function () {
                $scope.entities = [];
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "realization") {
                this.getRecapitulations(this.indexCtrl.region.ID);
            }
        }

        getRecapitulations(parentID: number) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentID": parentID
            }
            var type = Controllers.FrozenAccountRecapitulationController;
            if (this.indexCtrl.currentUser) {
                // TODO: HUH?
                type = Controllers.FrozenAccountRecapitulationController;
            }
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionID != parentID);
                    scope.total = recapitulations.filter(r => r.RegionID == parentID)[0];
                });
            });
        }

    }

    kawaldesa.controller("AccountRecapitulationCtrl", AccountRecapitulationCtrl);
}