/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

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

    kawaldesa.controller("BhprAllocationCtrl", BhprAllocationCtrl);
}