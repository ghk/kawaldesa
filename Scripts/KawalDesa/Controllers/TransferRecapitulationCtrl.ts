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
            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
            $scope.$on('regionChangeBefore', function () {
                $scope.entities = [];
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "transfer") {
                this.expandedStates = {};
                this.formTransactions = {};
                this.formErrors = {};
                this.formSavingStates = {};
                this.transactions = {};
                this.getRecapitulations(this.indexCtrl.region.ID);
            }
        }

        toggleTransactions(entityID, ev) {
            ev.preventDefault();
            this.expandedStates[entityID] = !this.expandedStates[entityID];
            this.loadTransactions(entityID);
        }

        isExpanded(entity) {
            var result = this.expandedStates[entity.RegionID];
            return result;
        }

        setFormExpanded(entity, state) {
            if (state) {
                this.formTransactions[entity.RegionID] = {
                    fkSourceID: state[0],
                    fkDestinationID: state[1],
                    fkActorID: state[2]
                }
            } else {
                delete this.formTransactions[entity.RegionID];
                delete this.formErrors[entity.RegionID];
                delete this.formSavingStates[entity.RegionID];
            }
        }

        isFormExpanded(entity) {
            return this.formTransactions[entity.RegionID];
        }

        saveForm(entity) {
            var ctrl = this;

            var formData = JSON.parse(JSON.stringify(this.formTransactions[entity.RegionID]));
            var date = formData["Date"];
            date = date.substr(6, 4) + "-" + date.substr(3, 2) + "-" + date.substr(0, 2) + "T00:00:00";
            formData["Date"] = date;

            ctrl.formSavingStates[entity.RegionID] = true;
            Controllers.TransactionController.AddTransferTransaction(new Scaffold.Multipart({
                forms: formData,
                files: this.formTransactions[entity.RegionID].File
            })).success(() => {
                ctrl.formSavingStates[entity.RegionID] = false;
                ctrl.setFormExpanded(entity, null);
                ctrl.getRecapitulations(entity.ParentRegionID);
                ctrl.loadTransactions(entity.RegionID);
            }).error(formErr => {
                ctrl.formSavingStates[entity.RegionID] = false;
                ctrl.formErrors[entity.RegionID] = {};
                ctrl.formErrors[entity.RegionID][formErr.Field] = formErr.Message;
                var modelState = formErr.ModelState;
                var keys = Object.keys(modelState);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    ctrl.formErrors[entity.RegionID][key] = modelState[key].join(",");
                }
            });
        }

        getRecapitulations(parentID: string) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentID": parentID
            }
            var type = Controllers.FrozenTransferRecapitulationController;
            if (this.indexCtrl.currentUser) {
                type = Controllers.TransferRecapitulationController;
            }
            scope.entities = [];
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionID != parentID);
                    scope.total = recapitulations.filter(r => r.RegionID == parentID)[0];
                });
            });
        }

        loadTransactions(entityID) {
            var ctrl = this;
            if (this.expandedStates[entityID]) {
                Controllers.TransactionController.GetTransferTransactions(entityID).done(details => {
                    ctrl.$scope.$apply(() => {
                        ctrl.transactions[entityID] = details;
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