/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
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
            type.GetAll(query).then((recapitulations) => {
                scope.entities = recapitulations.data.filter(r => r.RegionId != parentId);
                scope.total = recapitulations.data.filter(r => r.RegionId == parentId)[0];
            });
        }


    }

}