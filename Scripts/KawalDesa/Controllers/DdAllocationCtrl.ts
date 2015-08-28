/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="AllocationCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

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
    kawaldesa.controller("DdAllocationCtrl", DdAllocationCtrl);
}