/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    export class AllocationCtrl {

        indexCtrl: IndexCtrl;
        uploadDoc = new Models.Spreadsheet();
        file: any;

        constructor(public $scope, public routePrefix,
            public documentTypes, public recapitulationTypes) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            $scope.$on('regionChangeBefore', function () {
                $scope.entities = [];
                $scope.isEntitiesLoading = true;
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == this.routePrefix) {
                if (this.indexCtrl.guessedRegionType <= 1) {
                    this.indexCtrl.configureDocumentUpload(this.documentTypes[0], "0");
                } else if (this.indexCtrl.guessedRegionType >= 2) {
                    var kabId = this.indexCtrl.regionId;
                    var ids = this.indexCtrl.regionId.split(".");
                    if (ids.length > 2)
                        kabId = ids[0] + "." + ids[1];
                    this.indexCtrl.configureDocumentUpload(this.documentTypes[1], kabId);
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
            var type: any = this.recapitulationTypes[0];
            if (this.indexCtrl.currentUser) {
                type = this.recapitulationTypes[1];
            }
            if (this.indexCtrl.guessedRegionType >= 2) {
                type = this.recapitulationTypes[2];
                if (this.indexCtrl.currentUser) {
                    type = this.recapitulationTypes[3];
                }
            }
            scope.entities = [];
            type.GetAll(query).then((recapitulations) => {
                scope.entities = recapitulations.data.filter(r => r.RegionId != parentId);
                scope.total = recapitulations.data.filter(r => r.RegionId == parentId)[0];
            }).finally(() => {
                scope.isEntitiesLoading = false;
            });
        }


    }

    class AddAllocationCtrl extends AllocationCtrl {

        static $inject = ["$scope"];

        constructor(public $scope) {
            super($scope, "add"
                , [Models.DocumentUploadType.NationalAdd, Models.DocumentUploadType.RegionalAdd]
                , [
                    Controllers.FrozenNationalAddRecapitulationController,
                    Controllers.NationalAddRecapitulationController,
                    Controllers.FrozenRegionalAddRecapitulationController,
                    Controllers.RegionalAddRecapitulationController,
                ]);
        }

    }


    class DdAllocationCtrl extends AllocationCtrl {

        static $inject = ["$scope"];

        constructor(public $scope) {
            super($scope, "dd"
                , [Models.DocumentUploadType.NationalDd, Models.DocumentUploadType.RegionalDd]
                , [
                    Controllers.FrozenNationalDdRecapitulationController,
                    Controllers.NationalDdRecapitulationController,
                    Controllers.FrozenRegionalDdRecapitulationController,
                    Controllers.RegionalDdRecapitulationController,
                ]);
        }

    }


    class BhprAllocationCtrl extends AllocationCtrl {

        static $inject = ["$scope"];

        constructor(public $scope) {
            super($scope, "bhpr"
                , [Models.DocumentUploadType.NationalBhpr, Models.DocumentUploadType.RegionalBhpr]
                , [
                    Controllers.FrozenNationalBhprRecapitulationController,
                    Controllers.NationalBhprRecapitulationController,
                    Controllers.FrozenRegionalBhprRecapitulationController,
                    Controllers.RegionalBhprRecapitulationController,
                ]);
        }

    }

    kawaldesa.controller("AddAllocationCtrl", AddAllocationCtrl);
    kawaldesa.controller("DdAllocationCtrl", DdAllocationCtrl);
    kawaldesa.controller("BhprAllocationCtrl", BhprAllocationCtrl);
}