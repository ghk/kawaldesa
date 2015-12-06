/// <reference path="../../typings/angularjs/angular.d.ts"/>
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
                ctrl.onRegionChanged();
                if (ctrl.indexCtrl.type == ctrl.routePrefix) {
                    ctrl.getBundle(ctrl.indexCtrl.regionId);
                }
            });
        }

        onRegionChanged() {
        }

        getBundle(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;
            var type = this.routePrefix;

            scope.entities = [];
            scope.isEntitiesLoading = true;

            App.Controllers.Services.BundleController.GetAllocationBundle(type, "2015p", parentId)
                .then(bundle => {
                    ctrl.indexCtrl.loadRegion(bundle.data.Region);
                    var recapitulations = null;
                    var regionType = bundle.data.Region.Type;
                    if (type == "dd") {
                        recapitulations = regionType < 2
                            ? bundle.data.NationalDdRecapitulations
                            : bundle.data.RegionalDdRecapitulations;
                    }
                    else if (type == "add") {
                        recapitulations = regionType < 2
                            ? bundle.data.NationalAddRecapitulations
                            : bundle.data.RegionalAddRecapitulations;
                    }
                    else if (type == "bhpr") {
                        recapitulations = regionType < 2
                            ? bundle.data.NationalBhprRecapitulations
                            : bundle.data.RegionalBhprRecapitulations;
                    }

                    scope.entities = recapitulations.filter(r => r.RegionId != parentId);
                    scope.total = recapitulations.filter(r => r.RegionId == parentId)[0];
                    ctrl.indexCtrl.activeUpload = bundle.data.CurrentSpreadsheet;
                    ctrl.indexCtrl.activeUploadRegionId = bundle.data.Region.Id;

                    if (regionType !== 0 && regionType !== 2) 
                        ctrl.indexCtrl.activeUploadRegionId = bundle.data.Region.fkParentId;
                    
                    ctrl.indexCtrl.activeSources = bundle.data.SourceDocuments;
                    ctrl.indexCtrl.activeUploadType = regionType < 2
                        ? ctrl.documentTypes[0]
                        : ctrl.documentTypes[1];

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