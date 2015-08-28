/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

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

    kawaldesa.controller("AddAllocationCtrl", AddAllocationCtrl);
}