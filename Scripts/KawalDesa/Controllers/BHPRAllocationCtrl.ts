/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class BhprAllocationCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;

        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "bhpr") {
                this.getRecapitulations(this.indexCtrl.region.Id);
            }
        }

        getRecapitulations(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentId": parentId
            }
            var type = Controllers.FrozenAccountRecapitulationController;
            if (this.indexCtrl.currentUser) {
                // TODO: HUH?
                type = Controllers.FrozenAccountRecapitulationController;
            }
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionId != parentId);
                    scope.total = recapitulations.filter(r => r.RegionId == parentId)[0];
                });
            });
        }

    }

    kawaldesa.controller("BhprAllocationCtrl", BhprAllocationCtrl);
}