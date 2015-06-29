/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class DdAllocationCtrl {

        static $inject = ["$scope"];

        indexCtrl: IndexCtrl;
        uploadDoc = new Models.DocumentUpload();
        file: any;

        constructor(public $scope) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "dd") {
                this.indexCtrl.configureDocumentUpload(Models.DocumentUploadType.NationalDd, "0");
                this.getRecapitulations(this.indexCtrl.region.Id);
            }
        }

        getRecapitulations(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "fkParentId": parentId
            }
            var type = Controllers.FrozenNationalDdRecapitulationController;
            if (this.indexCtrl.currentUser) {
                type = Controllers.NationalDdRecapitulationController;
            }
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionId != parentId);
                    scope.total = recapitulations.filter(r => r.RegionId == parentId)[0];
                });
            });
        }


    }

    kawaldesa.controller("DdAllocationCtrl", DdAllocationCtrl);
}