/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class TransferRecapitulationCtrl {

        static $inject = ["$scope", "$upload"];

        expandedStates = {};
        formTransactions: { [key: number]: any } = {};
        formErrors = {};
        formSavingStates = {};
        transactions: { [key: number]: any } = {};
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
                this.expandedStates = {};
                this.formTransactions = {};
                this.formErrors = {};
                this.formSavingStates = {};
                this.transactions = {};
                this.getRecapitulations(this.indexCtrl.regionId);
            }
        }

        toggleTransactions(entityId, ev) {
            ev.preventDefault();
            this.expandedStates[entityId] = !this.expandedStates[entityId];
            this.loadTransactions(entityId);
        }

        isExpanded(entity) {
            var result = this.expandedStates[entity.RegionId];
            return result;
        }

        setFormExpanded(entity, state) {
            if (state) {
                this.formTransactions[entity.RegionId] = {
                    fkSourceId: state[0],
                    fkDestinationId: state[1],
                    fkActorId: state[2]
                }
            } else {
                delete this.formTransactions[entity.RegionId];
                delete this.formErrors[entity.RegionId];
                delete this.formSavingStates[entity.RegionId];
            }
        }

        isFormExpanded(entity) {
            return this.formTransactions[entity.RegionId];
        }

        saveForm(entity) {
            var ctrl = this;

            var formData = JSON.parse(JSON.stringify(this.formTransactions[entity.RegionId]));
            var date = formData["Date"];
            date = date.substr(6, 4) + "-" + date.substr(3, 2) + "-" + date.substr(0, 2) + "T00:00:00";
            formData["Date"] = date;

            ctrl.formSavingStates[entity.RegionId] = true;
            Controllers.TransactionController.AddTransferTransaction(new Scaffold.Multipart({
                forms: formData,
                files: this.formTransactions[entity.RegionId].File
            })).success(() => {
                ctrl.formSavingStates[entity.RegionId] = false;
                ctrl.setFormExpanded(entity, null);
                ctrl.getRecapitulations(entity.ParentRegionId);
                ctrl.loadTransactions(entity.RegionId);
            }).error(formErr => {
                ctrl.formSavingStates[entity.RegionId] = false;
                ctrl.formErrors[entity.RegionId] = {};
                ctrl.formErrors[entity.RegionId][formErr.Field] = formErr.Message;
                var modelState = formErr.ModelState;
                var keys = Object.keys(modelState);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    ctrl.formErrors[entity.RegionId][key] = modelState[key].join(",");
                }
            });
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
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionId != parentId);
                    scope.total = recapitulations.filter(r => r.RegionId == parentId)[0];
                });
            });
        }

        loadTransactions(entityId) {
            var ctrl = this;
            if (this.expandedStates[entityId]) {
                Controllers.TransactionController.GetTransferTransactions(entityId).done(details => {
                    ctrl.$scope.$apply(() => {
                        ctrl.transactions[entityId] = details;
                    });
                });
            }
        }

        moveFillMeterBar(fullValue:number, realValue:number) {
            var getPercent = (realValue / fullValue) * 100;
            return { "width": getPercent + "%" };
        }

    }

    kawaldesa.controller("TransferRecapitulationCtrl", TransferRecapitulationCtrl);
}