/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class BhprAllocationCtrl {

        static $inject = ["$scope"];

        indexCtrl: IndexCtrl;
        uploadDoc = new Models.Spreadsheet();
        file: any;

        constructor(public $scope) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            $scope.$on('regionChangeBefore', function () {
                $scope.entities = [];
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "bhpr") {
                if (this.indexCtrl.guessedRegionType <= 1) {
                    this.indexCtrl.configureDocumentUpload(Models.DocumentUploadType.NationalBhpr, "0");
                } else if (this.indexCtrl.guessedRegionType >= 2) {
                    var kabId = this.indexCtrl.regionId;
                    var ids = this.indexCtrl.regionId.split(".");
                    if (ids.length > 2)
                        kabId = ids[0] + "." + ids[1];
                    this.indexCtrl.configureDocumentUpload(Models.DocumentUploadType.RegionalBhpr, kabId);
                }
                this.getRecapitulations(this.indexCtrl.regionId);
            }
        }

        getRecapitulations(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "fkParentId": parentId
            }
            var type : any = Controllers.FrozenNationalBhprRecapitulationController;
            if (this.indexCtrl.currentUser) {
                type = Controllers.NationalBhprRecapitulationController;
            }
            if (this.indexCtrl.guessedRegionType >= 2) {
                type = Controllers.FrozenRegionalBhprRecapitulationController;
                if (this.indexCtrl.currentUser) {
                    type = Controllers.RegionalBhprRecapitulationController;
                }
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