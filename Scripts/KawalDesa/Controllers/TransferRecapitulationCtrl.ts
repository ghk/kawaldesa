/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class TransferRecapitulationCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;

        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;
            $scope.$on('regionChangeBefore', function () {
                $scope.entities = [];
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "transfer") {
                this.getRecapitulations(this.indexCtrl.regionId);
            }
        }


        getRecapitulations(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentId": parentId,
                "ApbnKey": "2015p"
            }
            var type = Controllers.FrozenTransferRecapitulationController;
            if (this.indexCtrl.currentUser) {
                type = Controllers.TransferRecapitulationController;
            }
            scope.entities = [];
            if (this.indexCtrl.guessedRegionType < 4) {
                type.GetAll(query).then((recapitulations) => {
                    scope.entities = recapitulations.data.filter(r => r.RegionId != parentId);
                    scope.total = recapitulations.data.filter(r => r.RegionId == parentId)[0];
                });
            } else {
                var entities = [];
                for (var i = 0; i < 10; i++) {
                    entities.push({
                        "Date": "25-12-2015",
                        "Dd": i % 3 == 0 ? Math.random() * 1000000 : null,
                        "Add": i % 3 == 1 ? Math.random() * 1000000 : null,
                        "Bhpr": i % 3 == 2 ? Math.random() * 1000000 : null,
                    });
                    scope.entities = entities;
                    scope.total = { "Dd": 2000000, "Add": 212100101, "Bhpr": 238349349 };
                }
            }
        }


        moveFillMeterBar(fullValue:number, realValue:number) {
            var getPercent = (realValue / fullValue) * 100;
            return { "width": getPercent + "%" };
        }

    }

    kawaldesa.controller("TransferRecapitulationCtrl", TransferRecapitulationCtrl);
}