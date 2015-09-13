/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>
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
                if (ctrl.indexCtrl.type == "transfer") {
                    ctrl.getBundle(ctrl.indexCtrl.regionId);
                }
            });

            this.initDummyChart();
        }

        initDummyChart() {
            var $scope = this.$scope;
            $scope.labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            $scope.series = ['Penyaluran DD', 'Penyaluran ADD'];
            $scope.chartOptions = {
                scaleOverride: true,
                scaleSteps: 5,
                scaleStepWidth: 20,
                scaleStartValue: 0,
                scaleLabel: "<%=value%>%",
            };
            $scope.data = [
                //[65, 59, 80, 81, 56, 55, 40, 80, 80, 80, 80, 80],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            $scope.polarLabels = ["DD", "ADD", "PDRD"];
            $scope.polarData = [0, 0, 0];
            $scope.polarChartOptions = {
                scaleLabel: "<%=value%> M",
            };

            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
        }

        onRegionChanged() {
        }


        getBundle(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;

            scope.entities = [];
            scope.isEntitiesLoading = true;

            App.Controllers.Services.BundleController.GetTransferBundle("2015p", parentId)
                .then(bundle => {
                    ctrl.indexCtrl.loadRegion(bundle.data.Region);
                    if (ctrl.indexCtrl.guessedRegionType < 4) {
                        scope.entities = bundle.data.TransferRecapitulations.filter(r => r.RegionId != parentId);
                        scope.total = bundle.data.TransferRecapitulations.filter(r => r.RegionId == parentId)[0];
                        scope.polarData[0] = scope.total.BudgetedDd / 1000000000;
                        scope.polarData[1] = scope.total.BudgetedAdd / 1000000000;
                        scope.polarData[2] = scope.total.BudgetedBhpr / 1000000000;
                        console.log(scope.polarData);
                    } else {
                        scope.entities = bundle.data.Transfers;
                        var total = {
                            Dd: 0, Add: 0, Bhpr: 0,
                        }
                        for (var i = 0; i < bundle.data.Transfers.length; i++) {
                            var transfer = bundle.data.Transfers[i];
                            total.Dd += transfer.Dd;
                            total.Add += transfer.Add;
                            total.Bhpr += transfer.Bhpr;
                        }
                        scope.total = total;
                    }
                }).finally(() => {
                    scope.isEntitiesLoading = false;
                });
        }


    }

    kawaldesa.controller("TransferRecapitulationCtrl", TransferRecapitulationCtrl);
}