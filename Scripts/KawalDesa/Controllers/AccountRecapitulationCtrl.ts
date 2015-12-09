/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>
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

            //this.getRecapitulations(this.indexCtrl.region.Id);
            
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "realization") {
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
            var type = Controllers.AccountRecapitulationController;
            type.GetAll(query).then((recapitulations) => {
                scope.entities = recapitulations.data.filter(r => r.RegionId != parentId);
                scope.total = recapitulations.data.filter(r => r.RegionId == parentId)[0];
            });
        }

    }

    kawaldesa.controller("AccountRecapitulationCtrl", AccountRecapitulationCtrl);
}